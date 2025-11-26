import { useLoginWithSiws } from "@privy-io/expo";
import { useBackpackDeeplinkWalletConnector } from "@privy-io/expo/connectors";
import Toast from "react-native-toast-message";
import { walletBaseConfig } from "@/config";
import useWalletConnector from "@/hooks/use-wallet-connector";
import { base58ToBase64 } from "@/utils/base58-to-base64";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const useBackpack = () => {
  const router = useRouter();
  const { generateMessage, login } = useLoginWithSiws();

  const { address, connect, isConnected, signMessage } = useWalletConnector(
    useBackpackDeeplinkWalletConnector,
    walletBaseConfig
  );

  const handleConnect = async () => {
    try {
      await connect();
      Toast.show({
        type: "success",
        text1: "Connected to Backpack wallet",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: `Error connecting Backpack wallet: ${error}`,
      });
    }
  };

  useEffect(() => {
    if (isConnected) {
      handleLogin();
    }
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
            walletClientType: "backpack",
            connectorType: "mobile_wallet_protocol",
          },
        });
        router.push("/home");
        Toast.show({
          type: "success",
          text1: "Logged in successfully",
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

  return { handleConnect };
};

export default useBackpack;
