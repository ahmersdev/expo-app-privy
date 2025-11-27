import { PrivyProvider } from "@privy-io/expo";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";

const RootLayout = () => {
  return (
    <PrivyProvider
      appId={Constants.expoConfig?.extra?.privyAppId}
      clientId={Constants.expoConfig?.extra?.privyClientId}
    >
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: "#020713" },
          }}
        />
        <Stack.Screen
          name="home"
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: "#020713" },
          }}
        />
      </Stack>
      <Toast />
    </PrivyProvider>
  );
};

export default RootLayout;
