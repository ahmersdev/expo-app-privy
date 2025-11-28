import {
  BackpackWallet,
  BitgetWallet,
  MetaMaskWallet,
  OkxWallet,
  PhantomWallet,
  SolflareWallet,
} from "@/components/login-wallets";
import { usePrivy } from "@privy-io/expo";
import { Redirect } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const { user }: any = usePrivy();

  if (user) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView
      style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16 }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 16,
          textAlign: "center",
          color: "#ffffff",
        }}
      >
        Login Page
      </Text>

      <PhantomWallet />
      <BackpackWallet />
      <SolflareWallet />
      <MetaMaskWallet />
      <BitgetWallet />
      <OkxWallet />
    </SafeAreaView>
  );
};

export default Login;
