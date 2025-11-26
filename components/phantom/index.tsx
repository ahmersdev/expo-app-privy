import { Text } from "react-native";
import Button from "../button";
import usePhantom from "./use-phantom";

const PhantomWallet = () => {
  const { router, handleConnect } = usePhantom();

  return (
    <>
      <Text>Phantom Wallet</Text>
      <Button title={"Home Page"} onPress={() => router.push("/home")} />

      <Button title={"Login with Phantom"} onPress={handleConnect} />
    </>
  );
};

export default PhantomWallet;
