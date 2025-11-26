import ConnectionDetails from "@/components/connection-details";
import { usePrivy } from "@privy-io/expo";
import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

const Home = () => {
  const { user }: any = usePrivy();

  if (!user) {
    return <Redirect href="/" />;
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
        label={user.linked_accounts[0]?.wallet_client_type}
        address={user.linked_accounts[0]?.address}
      />
    </SafeAreaView>
  );
};

export default Home;
