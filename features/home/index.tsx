import ConnectionDetails from "@/components/connection-details";
import { usePrivy } from "@privy-io/expo";
import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { connectorsDataArray } from "./home.data";
import useWalletConnector from "@/hooks/use-wallet-connector";
import { Text } from "react-native";

const Home = () => {
  const { user } = usePrivy();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <SafeAreaView style={{ padding: 16 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        Home Page
      </Text>
      <ConnectionDetails
        key={"Phantom"}
        label={"Phantom"}
        address={user.linked_accounts[0]?.address}
        disconnect={() => {}}
      />

      {connectorsDataArray.map(({ label, hook, config }: any) => {
        const wallet = useWalletConnector(hook, config);
        if (!wallet.isConnected) return null;

        return (
          <ConnectionDetails
            key={label}
            label={label}
            address={wallet.address}
            disconnect={wallet.disconnect}
          />
        );
      })}
    </SafeAreaView>
  );
};

export default Home;
