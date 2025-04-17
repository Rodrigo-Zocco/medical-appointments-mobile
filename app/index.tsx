import { ActionButton } from "@/components/action-button";
import { AppointmentsContainer } from "@/components/appointments-container";
import { NextAppointment } from "@/components/next-appointment";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "expo-router";

export default function Appointments() {
  const router = useRouter();

  // TODO: Should be fetched from DB, the one with the closer positive (not already passed) date.
  const nextAppointmentMock = {
    id: 1,
    date: new Date("2025-04-20T10:30:00"),
    doctorName: "Dr. Maria López",
    location: "Clinica Central, Sala 3",
    name: "Consulta General",
    additionalInfo: "Llevar estudios anteriores",
  };

  return (
    <>
      <NextAppointment appointment={nextAppointmentMock} />
      <Separator />
      <ActionButton
        callback={() => {
          router.push("/appointments/create");
        }}
        text={"Agendar nuevo turno"}
        color={"green"}
      />
      <Separator />
      <AppointmentsContainer />
    </>
  );
}
