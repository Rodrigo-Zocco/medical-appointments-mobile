import { ActionButton } from "@/components/action-button";
import { AppointmentsContainer } from "@/components/appointments-container";
import { NextAppointment } from "@/components/next-appointment";
import { Separator } from "@/components/ui/separator";
import { Appointment } from "@/constants/types";
import { fetchUpcomingAppointment } from "@/db/service";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function Appointments() {
  const [nextAppointment, setNextAppointment] = useState<
    Appointment | undefined
  >(undefined);

  useEffect(() => {
    async function getUpcomingAppointment() {
      const result = await fetchUpcomingAppointment();
      if (!result) {
        setNextAppointment(undefined);
      } else {
        setNextAppointment(result);
      }
    }

    getUpcomingAppointment();
  }, []);

  const router = useRouter();

  return (
    <>
      <NextAppointment appointment={nextAppointment} />
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
