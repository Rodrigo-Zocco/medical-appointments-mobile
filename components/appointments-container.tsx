import { Appointment } from "@/constants/types";
import { View, ScrollView, Text } from "react-native";
import { AppointmentItem } from "./appointment-item";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import { getAppointments } from "@/db/service";

export function AppointmentsContainer() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    async function fetchAppointments() {
      const result = await getAppointments();
      setAppointments(result);
    }

    fetchAppointments();
  }, []);

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
