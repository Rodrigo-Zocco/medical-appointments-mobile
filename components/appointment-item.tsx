import { Appointment } from "@/constants/types";
import { StyleSheet, View, Text } from "react-native";
import { ActionButton } from "./action-button";
import { useRouter } from "expo-router";

export function AppointmentItem({ appointment }: { appointment: Appointment }) {
  const router = useRouter();

  const formattedDate = new Date(appointment.date);
  const isPast = formattedDate < new Date();

  function formatDateToSpanish(date: Date): string {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
      .format(date)
      .replace(",", "");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{appointment.name}</Text>
      <Text style={styles.subtitle}>
        {formatDateToSpanish(new Date(formattedDate))}
      </Text>
      {isPast && (
        <Text style={styles.warning}>La fecha de este turno ya ha pasado.</Text>
      )}
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
  subtitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "gray",
  },
  warning: {
    fontWeight: "bold",
    fontSize: 20,
    color: "red",
  },
});
