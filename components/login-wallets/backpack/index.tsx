import { Text, View } from "react-native";
import useBackpack from "./use-backpack";
import Button from "@/components/button";

const BackpackWallet = () => {
  const { handleConnect } = useBackpack();

  return (
    <View>
      <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 16 }}>
        Backpack Wallet
      </Text>

      <Button title={"Login with Backpack"} onPress={handleConnect} />
    </View>
  );
};

export default BackpackWallet;
