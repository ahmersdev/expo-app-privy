import { View, Text } from "react-native";
import Button from "../button";
import { IConnectionDetailsProps } from "./connection-details.interface";
import useConnectionDetails from "./use-connection-details";

const ConnectionDetails = (props: IConnectionDetailsProps) => {
  const { label, address, disconnect } = props;

  const { handleLogout } = useConnectionDetails();

  return (
    <View>
      <Text>{label} connected</Text>
      <Text>Address: {address}</Text>

      <Button title={"Logout"} onPress={handleLogout} />
      <Button title={"Disconnect"} onPress={disconnect} />
    </View>
  );
};

export default ConnectionDetails;
