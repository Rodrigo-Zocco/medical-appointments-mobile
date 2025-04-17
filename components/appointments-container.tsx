import { Appointment } from "@/constants/types";
import { View, ScrollView, Text } from "react-native";
import { AppointmentItem } from "./appointment-item";
import { Separator } from "./ui/separator";

export function AppointmentsContainer() {
  // TODO: This should be received in parameters or fetched here.
  const appointments: Appointment[] = [
    {
      id: 1,
      date: new Date("2025-04-20T10:30:00"),
      doctorName: "Dr. Maria López",
      location: "Clinica Central, Sala 3",
      name: "Consulta General",
      additionalInfo: "Llevar estudios anteriores",
    },
    {
      id: 2,
      date: new Date("2025-04-22T14:00:00"),
      doctorName: "Dr. Esteban Ruiz",
      location: "Hospital del Sol, Piso 2",
      name: "Control de presión",
    },
    {
      id: 3,
      date: new Date("2025-04-25T09:15:00"),
      location: "Centro Oftalmológico Norte",
      name: "Revisión visual",
    },
  ];

  return (
    <>
      <Text style={{ marginVertical: 4, fontWeight: "bold", fontSize: 30 }}>
        Listado de turnos:
      </Text>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {appointments.map((appointment) => (
          <View key={appointment.id}>
            <AppointmentItem appointment={appointment} />
            <Separator />
          </View>
        ))}
      </ScrollView>
    </>
  );
}
