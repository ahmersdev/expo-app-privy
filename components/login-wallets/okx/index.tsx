import { Text, View } from "react-native";
import Button from "@/components/button";
import useOkx from "./use-okx";

const OkxWallet = () => {
  const { handleConnect } = useOkx();

  return (
    <View>
      <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 16 }}>
        Okx Wallet
      </Text>

      <Button title={"Login with Okx"} onPress={handleConnect} />
    </View>
  );
};

export default OkxWallet;
