import { useLoginWithSiws, usePrivy } from "@privy-io/expo";
import { usePhantomDeeplinkWalletConnector } from "@privy-io/expo/connectors";
import { ActivityIndicator, Text } from "react-native";
import Button from "../button";
import Toast from "react-native-toast-message";
import { walletBaseConfig } from "@/config";
import useWalletConnector from "@/hooks/use-wallet-connector";
import { base58ToBase64 } from "@/utils/base58-to-base64";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

const PhantomWallet = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { generateMessage, login } = useLoginWithSiws();

  const { address, connect, isConnected, signMessage } = useWalletConnector(
    usePhantomDeeplinkWalletConnector,
    walletBaseConfig
  );

  const handleConnect = async () => {
    try {
      await connect();
      Toast.show({
        type: "success",
        text1: "Connected to Phantom wallet",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: `Error connecting Phantom wallet: ${error}`,
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    if (isConnected) {
      handleLogin();
    }
    setLoading(false);
  }, [isConnected]);

  const handleLogin = async () => {
    // Connect to the wallet if not already connected
    if (!address) {
      return;
    }

    try {
      // Generate the SIWS message
      const { message } = await generateMessage({
        from: {
          domain: "privy.io",
          uri: "https://privy.io",
        },
        wallet: {
          address,
        },
      });

      // Sign the message
      let signature;
      try {
        signature = await signMessage(message);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: `Error signing message: ${error}`,
        });
      }

      // Login with the signature
      try {
        await login({
          message,
          signature: base58ToBase64(signature.signature),
          wallet: {
            walletClientType: "phantom",
            connectorType: "mobile_wallet_protocol",
          },
        });
      } catch (error) {
        Toast.show({
          type: "error",
          text1: `Error logging in: ${error}`,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: `Error generating SIWS message: ${error}`,
      });
    }
  };

  return (
    <>
      <Text>Phantom Wallet</Text>
      <Button title={"Home Page"} onPress={() => router.push("/")} />

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title={"Login with Phantom"} onPress={handleConnect} />
      )}
    </>
  );
};

export default PhantomWallet;
