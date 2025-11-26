import {
  useBackpackDeeplinkWalletConnector,
  useDeeplinkWalletConnector,
  usePhantomDeeplinkWalletConnector,
} from "@privy-io/expo/connectors";

const config = {
  appUrl: process.env.EXPO_PUBLIC_APP_URL || "privytest://",
  redirectUri: process.env.EXPO_PUBLIC_REDIRECT_URI || "/",
};

export const connectorsDataArray = [
  {
    label: "Phantom",
    hook: usePhantomDeeplinkWalletConnector,
    config,
  },
  {
    label: "Backpack",
    hook: useBackpackDeeplinkWalletConnector,
    config,
  },
  {
    label: "Other Wallet",
    hook: useDeeplinkWalletConnector,
    config: {
      ...config,
      baseUrl: "https://solflare.com",
      encryptionPublicKeyName: "solflare_encryption_public_key",
    },
  },
];
