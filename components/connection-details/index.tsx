import { View, Text, TouchableOpacity } from "react-native";

const ConnectionDetails = ({
  label,
  address,
  disconnect,
}: {
  label: string;
  address: string;
  disconnect: () => void;
}) => {
  return (
    <View>
      <Text>{label} connected</Text>
      <Text>Address: {address}</Text>
      <TouchableOpacity
        onPress={disconnect}
        style={{
          backgroundColor: "#8b86ff",
          padding: 10,
          borderRadius: 50,
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Text style={{ color: "#020713" }}>Disconnect</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConnectionDetails;
