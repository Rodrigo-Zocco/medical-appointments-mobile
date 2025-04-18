import { ActionButton } from "@/components/action-button";
import EditAppointmentForm from "@/components/appointment-edit";
import { Separator } from "@/components/ui/separator";
import { Appointment } from "@/constants/types";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function EditAppointment() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

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
      <EditAppointmentForm
        appointment={appointmentMock}
        onSubmit={async (appointment: Appointment) => {
          // TODO: Should persist the updated appointment.
          console.log("Edited appointment: ", appointment);
          await new Promise((r) => setTimeout(r, 2000));
          router.push("/");
        }}
      />
    </>
  );
}
