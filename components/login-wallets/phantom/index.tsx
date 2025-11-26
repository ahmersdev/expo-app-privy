import { Text } from "react-native";
import usePhantom from "./use-phantom";
import Button from "@/components/button";

const PhantomWallet = () => {
  const { handleConnect } = usePhantom();

  return (
    <>
      <Text>Phantom Wallet</Text>

      <Button title={"Login with Phantom"} onPress={handleConnect} />
    </>
  );
};

export default PhantomWallet;
