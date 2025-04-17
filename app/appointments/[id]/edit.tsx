import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function EditAppointment() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ padding: 20 }}>
      <Text>Editing appointment ID: {id}</Text>
    </View>
  );
}
