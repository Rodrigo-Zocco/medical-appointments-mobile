import { Appointment } from "@/constants/types";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Separator } from "./ui/separator";
import { ActionButton } from "./action-button";
import { useRouter } from "expo-router";

export default function AppointmentView({
  appointment,
  onDeleteAppointment,
}: {
  appointment: Appointment;
  onDeleteAppointment: (id: number) => Promise<void>;
}) {
  const router = useRouter();

  const formatDate = (date: Date) => {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}/${
      dateObj.getMonth() + 1
    }/${dateObj.getFullYear()}`;
  };

  const formatTime = (date: Date) => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{appointment.name}</Text>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Fecha:</Text>
            <Text style={styles.infoValue}>{formatDate(appointment.date)}</Text>
          </View>
          <Separator />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Hora:</Text>
            <Text style={styles.infoValue}>{formatTime(appointment.date)}</Text>
          </View>
          <Separator />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Doctor:</Text>
            <Text style={styles.infoValue}>
              {appointment.doctorName
                ? appointment.doctorName
                : "No especificado"}
            </Text>
          </View>
          <Separator />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Ubicación:</Text>
            <Text style={styles.infoValue}>{appointment.location}</Text>
          </View>
          <Separator />
          <View style={styles.additionalInfo}>
            <Text style={styles.infoLabel}>Información adicional:</Text>
            <Text style={styles.additionalInfoText}>
              {appointment.additionalInfo
                ? appointment.additionalInfo
                : "Sin información adicional"}
            </Text>
          </View>
        </View>
      </View>
      <ActionButton
        text={"Editar"}
        callback={() => router.push(`/appointments/${appointment.id}/edit`)}
        color={"blue"}
      />
      <Separator />
      <ActionButton
        text={"Borrar"}
        callback={() => onDeleteAppointment(appointment.id)}
        color={"red"}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoSection: {
    padding: 15,
  },
  infoRow: {
    flexDirection: "column",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 25,
  },
  infoValue: {
    fontSize: 25,
    fontWeight: "bold",
  },
  additionalInfo: {
    marginTop: 10,
  },
  additionalInfoText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
