import { PrivyProvider } from "@privy-io/expo";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <PrivyProvider
      appId={"cmieguf95016ljr0cs6ykf7es"}
      clientId={"client-WY6TLx7rnwxZtVoT6ZW5NseNSg6ELxSgCV9tVjko5U3YU"}
    >
      <Stack />
    </PrivyProvider>
  );
}
