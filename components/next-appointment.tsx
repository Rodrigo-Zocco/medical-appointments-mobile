import { Appointment } from "@/constants/types";
import { View, Text, StyleSheet } from "react-native";
import { ActionButton } from "./action-button";
import { useRouter } from "expo-router";

// Note: Shouldn't receive an already passed appointment date, or will show negative time left.
export function NextAppointment({
  appointment,
}: {
  appointment?: Appointment;
}) {
  const router = useRouter();

  if (!appointment) {
    return (
      <View>
        <Text style={styles.title}>
          No tenes ningún turno asignado proximamente.
        </Text>
      </View>
    );
  }

  const now = new Date();
  const appointmentDate = new Date(appointment.date);
  const timeDiff = appointmentDate.getTime() - now.getTime();

  const daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24));
  const hoursLeft = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));

  return (
    <View>
      <Text style={styles.title}>Tu próximo turno será en:</Text>
      <Text style={styles.title}>
        {" "}
        {daysLeft} días, {hoursLeft} horas
      </Text>
      <ActionButton
        text="Ver mi próximo turno"
        color="blue"
        callback={() => router.push(`/appointments/${appointment.id}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
});
