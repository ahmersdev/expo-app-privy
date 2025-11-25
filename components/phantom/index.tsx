import { usePhantomDeeplinkWalletConnector } from "@privy-io/expo/connectors";
import { Button } from "@react-navigation/elements";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { Text } from "react-native";

const PhantomWallet = () => {
  const {
    address,
    connect,
    disconnect,
    isConnected,
    signMessage,
    signTransaction,
    signAllTransactions,
    signAndSendTransaction,
  } = usePhantomDeeplinkWalletConnector({
    appUrl: process.env.EXPO_PUBLIC_APP_URL || "privytest://",
    redirectUri: process.env.EXPO_PUBLIC_REDIRECT_URI || "/",
  });

  // Function to handle message signing
  const handleSignMsg = async () => {
    try {
      const message = "Hello, Privy Expo!";
      const signature = await signMessage(message);
      console.log("Message signed:", signature);
    } catch (error) {
      console.error("Error signing message:", error);
    }
  };

  // Function to handle transaction signing
  const handleSignTx = async () => {
    try {
      // Create a transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(address || ""),
          toPubkey: new PublicKey("DESTINATION_ADDRESS"),
          lamports: LAMPORTS_PER_SOL * 0.01,
        })
      );

      const signedTx = await signTransaction(transaction);
      console.log("Transaction signed:", signedTx);
    } catch (error) {
      console.error("Error signing transaction:", error);
    }
  };

  // Function to handle signing and sending a transaction
  const handleSignAndSendTx = async () => {
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(address || ""),
          toPubkey: new PublicKey("DESTINATION_ADDRESS"),
          lamports: LAMPORTS_PER_SOL * 0.01,
        })
      );

      const signature = await signAndSendTransaction(transaction);
      console.log("Transaction sent:", signature);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  // Function to handle signing multiple transactions
  const handleSignAllTxs = async () => {
    try {
      const transactions = [
        new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: new PublicKey(address || ""),
            toPubkey: new PublicKey("DESTINATION_ADDRESS_1"),
            lamports: LAMPORTS_PER_SOL * 0.01,
          })
        ),
        new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: new PublicKey(address || ""),
            toPubkey: new PublicKey("DESTINATION_ADDRESS_2"),
            lamports: LAMPORTS_PER_SOL * 0.01,
          })
        ),
      ];

      const signedTxs = await signAllTransactions(transactions);
      console.log("Transactions signed:", signedTxs);
    } catch (error) {
      console.error("Error signing transactions:", error);
    }
  };

  return (
    <>
      <Text>Phantom Wallet</Text>
      <Text>Connected Phantom: {isConnected ? "true" : "false"}</Text>

      {!isConnected && (
        <Button onPress={() => connect()}>Connect Phantom Wallet</Button>
      )}

      {isConnected && (
        <>
          <Text>Address: {address}</Text>
          <Button onPress={() => disconnect()}>Disconnect</Button>
          <Button onPress={handleSignMsg}>Sign message</Button>
          <Button onPress={handleSignTx}>Sign transaction</Button>
          <Button onPress={handleSignAndSendTx}>
            Sign and send transaction
          </Button>
          <Button onPress={handleSignAllTxs}>Sign all transactions</Button>
        </>
      )}
    </>
  );
};

export default PhantomWallet;
