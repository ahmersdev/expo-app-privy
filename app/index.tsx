import { usePrivy } from "@privy-io/expo";
import {
  useBackpackDeeplinkWalletConnector,
  useDeeplinkWalletConnector,
  usePhantomDeeplinkWalletConnector,
} from "@privy-io/expo/connectors";
import { Redirect } from "expo-router";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { user } = usePrivy();

  if (!user) {
    return <Redirect href="/login" />;
  }

  const {
    address: phantomAddress,
    disconnect: phantomDisconnect,
    isConnected: isPhantomConnected,
  } = usePhantomDeeplinkWalletConnector({
    appUrl: process.env.EXPO_PUBLIC_APP_URL || "privytest://",
    redirectUri: process.env.EXPO_PUBLIC_REDIRECT_URI || "/",
  });

  const {
    address: backpackAddress,
    disconnect: backpackDisconnect,
    isConnected: isBackpackConnected,
  } = useBackpackDeeplinkWalletConnector({
    appUrl: process.env.EXPO_PUBLIC_APP_URL || "privytest://",
    redirectUri: process.env.EXPO_PUBLIC_REDIRECT_URI || "/",
  });

  const {
    address: othersAddress,
    disconnect: othersDisconnect,
    isConnected: isOthersConnected,
  } = useDeeplinkWalletConnector({
    // Base URL for the wallet
    baseUrl: "https://solflare.com",
    // The name of the public key used for encryption
    encryptionPublicKeyName: "solflare_encryption_public_key",
    // Other wallet-specific configuration
    appUrl: process.env.EXPO_PUBLIC_APP_URL || "privytest://",
    redirectUri: process.env.EXPO_PUBLIC_REDIRECT_URI || "/",
  });

  return (
    <SafeAreaView>
      {isPhantomConnected && (
        <View>
          <Text>Phantom connected</Text>
          <Text>Address: {phantomAddress}</Text>
          <Button title="Disconnect" onPress={() => phantomDisconnect()} />
        </View>
      )}

      {isBackpackConnected && (
        <View>
          <Text>Backpack connected</Text>
          <Text>Address: {backpackAddress}</Text>
          <Button title="Disconnect" onPress={() => backpackDisconnect()} />
        </View>
      )}

      {isOthersConnected && (
        <View>
          <Text>Others connected</Text>
          <Text>Address: {othersAddress}</Text>
          <Button title="Disconnect" onPress={() => othersDisconnect()} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
