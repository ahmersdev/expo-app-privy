import { useState, useEffect, useRef, useCallback } from "react";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { useLoginWithSiws } from "@privy-io/expo";
import { base58ToBase64 } from "@/utils/base58-to-base64";
import {
  solflareBuildUrl,
  solflareDecryptPayload,
  solflareEncryptPayload,
} from "./solflare.utils";

// --- Constants ---
const CLUSTER = "mainnet-beta";
const APP_URL = "https://privy.io"; // Your app's website
const REDIRECT_SCHEME = Linking.createURL("/"); // Consistent redirect scheme

const useSolflare = () => {
  const router = useRouter();
  const { generateMessage, login } = useLoginWithSiws();

  // State for UI reactivity
  const [userPublicKey, setUserPublicKey] = useState<string | null>(null);

  // Refs for internal logic (avoids closure staleness during async flows)
  const sessionRef = useRef<string | null>(null);
  const sharedSecretRef = useRef<Uint8Array | null>(null);
  const dappKeyPair = useRef<nacl.BoxKeyPair | null>(null);

  // Track pending Deep Link requests
  const pendingRequest = useRef<{
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
    type: "connect" | "signMessage";
  } | null>(null);

  // Initialize KeyPair on mount
  useEffect(() => {
    dappKeyPair.current ??= nacl.box.keyPair();
  }, []);

  // --- Deep Link Handler ---
  const handleDeepLink = useCallback(({ url }: { url: string }) => {
    if (!pendingRequest.current) return;

    try {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);

      // Handle Solflare Errors
      if (params.get("errorCode")) {
        const msg = params.get("errorMessage") || "Unknown error";
        pendingRequest.current.reject(new Error(`Solflare: ${msg}`));
        return;
      }

      // Handle Connect
      if (pendingRequest.current.type === "connect") {
        const solflarePublicKey = params.get("solflare_encryption_public_key");
        const data = params.get("data");
        const nonce = params.get("nonce");

        if (!solflarePublicKey || !data || !nonce || !dappKeyPair.current) {
          throw new Error("Missing connection parameters");
        }

        const secret = nacl.box.before(
          bs58.decode(solflarePublicKey),
          dappKeyPair.current.secretKey
        );

        // Update Refs synchronously
        sharedSecretRef.current = secret;
        const decrypted = solflareDecryptPayload(data, nonce, secret);
        sessionRef.current = decrypted.session;

        // Update UI State
        setUserPublicKey(decrypted.public_key);

        pendingRequest.current.resolve(decrypted.public_key);
      }

      // Handle Sign Message
      else if (pendingRequest.current.type === "signMessage") {
        const data = params.get("data");
        const nonce = params.get("nonce");

        if (!data || !nonce || !sharedSecretRef.current) {
          throw new Error("Missing sign parameters");
        }

        const decrypted = solflareDecryptPayload(
          data,
          nonce,
          sharedSecretRef.current
        );
        pendingRequest.current.resolve(decrypted.signature);
      }
    } catch (error) {
      pendingRequest.current.reject(error);
    } finally {
      pendingRequest.current = null;
    }
  }, []);

  // Setup Listener
  useEffect(() => {
    const subscription = Linking.addEventListener("url", handleDeepLink);
    return () => subscription.remove();
  }, [handleDeepLink]);

  // --- Actions ---

  const handleConnect = async () => {
    try {
      if (!dappKeyPair.current) throw new Error("Keypair not initialized");

      const params = new URLSearchParams({
        dapp_encryption_public_key: bs58.encode(dappKeyPair.current.publicKey),
        cluster: CLUSTER,
        app_url: APP_URL,
        redirect_link: REDIRECT_SCHEME,
      });

      const url = solflareBuildUrl("connect", params);

      const responsePromise = new Promise((resolve, reject) => {
        pendingRequest.current = { resolve, reject, type: "connect" };
      });

      await Linking.openURL(url);
      const address = await responsePromise;

      Toast.show({
        type: "success",
        text1: "Connected",
        text2: `Wallet: ${(address as string).slice(0, 4)}...`,
      });

      return address as string;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Connection Failed",
        text2: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  };

  const handleSignMessage = async (message: string) => {
    try {
      const currentSession = sessionRef.current;
      const currentSecret = sharedSecretRef.current;

      if (!currentSession || !currentSecret || !dappKeyPair.current) {
        throw new Error("Wallet not connected");
      }

      const [nonce, encryptedPayload] = solflareEncryptPayload(
        {
          session: currentSession,
          message: bs58.encode(Buffer.from(message)),
          display: "utf8",
        },
        currentSecret
      );

      const params = new URLSearchParams({
        dapp_encryption_public_key: bs58.encode(dappKeyPair.current.publicKey),
        nonce: bs58.encode(nonce),
        redirect_link: REDIRECT_SCHEME,
        payload: bs58.encode(encryptedPayload),
      });

      const url = solflareBuildUrl("signMessage", params);

      const responsePromise = new Promise((resolve, reject) => {
        pendingRequest.current = { resolve, reject, type: "signMessage" };
      });

      await Linking.openURL(url);
      const signature = await responsePromise;

      Toast.show({ type: "success", text1: "Message Signed" });
      return signature as string;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sign Error",
        text2: error instanceof Error ? error.message : String(error),
      });
      return null;
    }
  };

  const handleLogin = async () => {
    try {
      // 1. Connect (if needed)
      let address = userPublicKey;
      if (!address || !sessionRef.current) {
        address = (await handleConnect()) || null;
        if (!address) return;
      }

      // 2. Generate SIWS Message
      const { message } = await generateMessage({
        from: { domain: "privy.io", uri: APP_URL },
        wallet: { address },
      });

      // 3. Sign Message
      const signatureBase58 = await handleSignMessage(message);
      if (!signatureBase58) throw new Error("Failed to retrieve signature");

      // 4. Login to Privy
      await login({
        message,
        signature: base58ToBase64(signatureBase58),
        wallet: {
          walletClientType: "solflare",
          connectorType: "mobile_wallet_protocol",
        },
      });

      Toast.show({ type: "success", text1: "Logged in successfully" });
      router.push("/home");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error instanceof Error ? error.message : String(error),
      });
    }
  };

  return {
    handleConnect,
    handleSignMessage,
    handleLogin,
    userPublicKey,
    isConnected: !!userPublicKey,
  };
};

export default useSolflare;
