import { Text, View } from "react-native";
import usePhantom from "./use-phantom";
import Button from "@/components/button";

const PhantomWallet = () => {
  const { handleConnect } = usePhantom();

  return (
    <View>
      <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 16 }}>
        Phantom Wallet
      </Text>

      <Button title={"Login with Phantom"} onPress={handleConnect} />
    </View>
  );
};

export default PhantomWallet;
