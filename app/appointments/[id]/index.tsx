import { ActionButton } from "@/components/action-button";
import AppointmentView from "@/components/appointment-view";
import { Separator } from "@/components/ui/separator";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text } from "react-native";

export default function Appointment() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // TODO: Should load the appointment from DB and return to "/"" if not found.
  const appointmentMock = {
    id: 1,
    date: new Date("2025-04-20T10:30:00"),
    doctorName: "-",
    location: "Clinica Central de la mendez, Sala 3",
    name: "Consulta General",
    additionalInfo: "-",
  };

  return (
    <>
      <ActionButton
        text={"Volver a inicio"}
        callback={() => {
          router.push("/");
        }}
        color={"blue"}
      />
      <Separator />
      <AppointmentView
        appointment={appointmentMock}
        onDeleteAppointment={async (id) => {
          console.log("Should delete appointment with id: ", id);
        }}
      />
    </>
  );
}
