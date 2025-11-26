import BackpackWallet from "@/components/backpack";
import OthersWallet from "@/components/others";
import PhantomWallet from "@/components/phantom";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  return (
    <SafeAreaView>
      <PhantomWallet />
      <BackpackWallet />
      <OthersWallet />
    </SafeAreaView>
  );
};

export default Login;
