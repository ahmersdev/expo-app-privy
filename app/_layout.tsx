import { PrivyProvider } from "@privy-io/expo";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

const RootLayout = () => {
  return (
    <PrivyProvider
      appId={"cmieguf95016ljr0cs6ykf7es"}
      clientId={"client-WY6TLx7rnwxZtVoT6ZW5NseNSg6ELxSgCV9tVjko5U3YU"}
    >
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </PrivyProvider>
  );
};

export default RootLayout;
