import { usePrivy } from "@privy-io/expo";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

const useConnectionDetails = () => {
  const { logout } = usePrivy();

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
      Toast.show({
        type: "success",
        text1: "Logged out successfully",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: `Error logging out: ${error}`,
      });
    }
  };

  return { handleLogout };
};

export default useConnectionDetails;
