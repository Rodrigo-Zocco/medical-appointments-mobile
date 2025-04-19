import { Appointment } from "@/constants/types";
import { StyleSheet, View, Text } from "react-native";
import { ActionButton } from "./action-button";
import { useRouter } from "expo-router";

export function AppointmentItem({ appointment }: { appointment: Appointment }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{appointment.name}</Text>
      <ActionButton
        text="Ver"
        color="blue"
        callback={() => router.push(`/appointments/${appointment.id}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: "white",
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
  },
});
