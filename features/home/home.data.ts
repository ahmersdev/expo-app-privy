import { walletBaseConfig } from "@/config";
import {
  useBackpackDeeplinkWalletConnector,
  useDeeplinkWalletConnector,
  usePhantomDeeplinkWalletConnector,
} from "@privy-io/expo/connectors";

export const connectorsDataArray = [
  {
    label: "Phantom",
    hook: usePhantomDeeplinkWalletConnector,
    config: walletBaseConfig,
  },
  {
    label: "Backpack",
    hook: useBackpackDeeplinkWalletConnector,
    config: walletBaseConfig,
  },
  {
    label: "Other Wallet",
    hook: useDeeplinkWalletConnector,
    config: {
      ...walletBaseConfig,
      baseUrl: "https://solflare.com",
      encryptionPublicKeyName: "solflare_encryption_public_key",
    },
  },
];
