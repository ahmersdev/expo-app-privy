import { View, Text } from "react-native";
import Button from "../button";
import { IConnectionDetailsProps } from "./connection-details.interface";
import useConnectionDetails from "./use-connection-details";

const ConnectionDetails = (props: IConnectionDetailsProps) => {
  const { label, address } = props;

  const { handleLogout } = useConnectionDetails();

  return (
    <View>
      <Text style={{ textTransform: "capitalize" }}>{label} connected</Text>
      <Text>Address: {address}</Text>

      <Button title={"Logout"} onPress={handleLogout} />
    </View>
  );
};

export default ConnectionDetails;
