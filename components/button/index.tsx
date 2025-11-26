import { Text, TouchableOpacity } from "react-native";

const Button = ({ title, onPress }: { title: string; onPress: () => void }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#8b86ff",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      <Text style={{ color: "#020713", fontSize: 16, fontWeight: "bold" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
