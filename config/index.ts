export const walletBaseConfig = {
  appUrl: process.env.EXPO_PUBLIC_APP_URL || "privytest://",
  redirectUri: process.env.EXPO_PUBLIC_REDIRECT_URI || "/login",
};
