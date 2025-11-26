import { Text } from "react-native";
import Button from "@/components/button";
import useSolflare from "./use-solflare";

const SolflareWallet = () => {
  const { handleConnect } = useSolflare();

  return (
    <>
      <Text>Solflare Wallet</Text>

      <Button title={"Login with Solflare"} onPress={handleConnect} />
    </>
  );
};

export default SolflareWallet;
