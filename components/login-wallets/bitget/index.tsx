import { Text, View } from "react-native";
import Button from "@/components/button";
import useBitget from "./use-bitget";

const BitgetWallet = () => {
  const { handleConnect } = useBitget();

  return (
    <View>
      <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 16 }}>
        Bitget Wallet
      </Text>

      <Button title={"Login with Bitget"} onPress={handleConnect} />
    </View>
  );
};

export default BitgetWallet;
