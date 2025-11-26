import { Text } from "react-native";
import useBackpack from "./use-backpack";
import Button from "@/components/button";

const BackpackWallet = () => {
  const { handleConnect } = useBackpack();

  return (
    <>
      <Text>Backpack Wallet</Text>

      <Button title={"Login with Backpack"} onPress={handleConnect} />
    </>
  );
};

export default BackpackWallet;
