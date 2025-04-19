import { ActionButton } from "@/components/action-button";
import EditAppointmentForm from "@/components/appointment-edit";
import { Separator } from "@/components/ui/separator";
import { Appointment } from "@/constants/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Appointment as AppointmentType } from "@/constants/types";
import { getAppointment, updateAppointment } from "@/db/service";

export default function EditAppointment() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [foundAppointment, setFoundAppointment] =
    useState<AppointmentType | null>(null);

  useEffect(() => {
    async function findAppointment() {
      const appointment = await getAppointment(Number(id));

      if (!appointment) {
        router.push("/");
      }
      setFoundAppointment(appointment);
    }

    findAppointment();
  }, []);

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
      {foundAppointment && (
        <EditAppointmentForm
          appointment={foundAppointment}
          onSubmit={async (appointment: Appointment) => {
            await updateAppointment(appointment);
            router.push("/");
          }}
        />
      )}
    </>
  );
}
