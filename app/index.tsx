import BackpackWallet from "@/components/backpack";
import OthersWallet from "@/components/others";
import PhantomWallet from "@/components/phantom";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <PhantomWallet />
      <BackpackWallet />
      <OthersWallet />
    </SafeAreaView>
  );
}
