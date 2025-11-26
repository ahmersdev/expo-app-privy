import { useLoginWithSiws } from "@privy-io/expo";
import { usePhantomDeeplinkWalletConnector } from "@privy-io/expo/connectors";
import { Button, Text } from "react-native";

const PhantomWallet = () => {
  const { generateMessage, login } = useLoginWithSiws();

  const { address, connect, isConnected, signMessage } =
    usePhantomDeeplinkWalletConnector({
      appUrl: process.env.EXPO_PUBLIC_APP_URL || "privytest://",
      redirectUri: process.env.EXPO_PUBLIC_REDIRECT_URI || "/",
    });

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error("Error connecting Phantom wallet:", error);
    }
  };

  const handleLogin = async () => {
    // Connect to the wallet if not already connected
    if (!address) {
      return;
    }

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
    const signature = await signMessage(message);

    // Login with the signature
    await login({
      message,
      signature: signature.signature,
      wallet: {
        walletClientType: "phantom",
        connectorType: "mobile_wallet_protocol",
      },
    });
  };

  return (
    <>
      <Text>Phantom Wallet</Text>

      {isConnected ? (
        <Button title={"Login with Phantom"} onPress={handleLogin} />
      ) : (
        <Button title={"Connect Phantom Wallet"} onPress={handleConnect} />
      )}
    </>
  );
};

export default PhantomWallet;
