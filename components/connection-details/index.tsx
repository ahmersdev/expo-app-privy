import { View, Text } from "react-native";
import Button from "../button";
import { IConnectionDetailsProps } from "./connection-details.interface";
import useConnectionDetails from "./use-connection-details";

const ConnectionDetails = (props: IConnectionDetailsProps) => {
  const { label, address } = props;

  const { handleLogout } = useConnectionDetails();

  return (
    <View>
      <Text
        style={{
          textTransform: "capitalize",
          color: "#ffffff",
          fontSize: 16,
        }}
      >
        <Text style={{ color: "#8b86ff", fontWeight: "bold" }}>{label}</Text>{" "}
        connected
      </Text>
      <Text style={{ color: "#ffffff", fontSize: 16 }}>
        Address:{" "}
        <Text style={{ color: "#8b86ff", fontWeight: "bold" }}>{address}</Text>
      </Text>

      <Button title={"Logout"} onPress={handleLogout} />
    </View>
  );
};

export default ConnectionDetails;
