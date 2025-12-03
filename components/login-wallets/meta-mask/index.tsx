import { Text, View } from "react-native";
import Button from "@/components/button";
import useMetaMask from "./use-meta-mask";

const MetaMaskWallet = () => {
  const { handleConnect } = useMetaMask();

  return (
    <View>
      <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 16 }}>
        MetaMask Wallet
      </Text>

      <Button title={"Login with MetaMask"} onPress={handleConnect} />
    </View>
  );
};

export default MetaMaskWallet;
