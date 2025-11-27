import { Text, View } from "react-native";
import Button from "@/components/button";
import useSolflare from "./use-solflare";

const SolflareWallet = () => {
  const { handleConnect } = useSolflare();

  return (
    <View>
      <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 16 }}>
        Solflare Wallet
      </Text>

      <Button title={"Login with Solflare"} onPress={handleConnect} />
    </View>
  );
};

export default SolflareWallet;
