import { ActionButton } from "@/components/action-button";
import AppointmentView from "@/components/appointment-view";
import { Separator } from "@/components/ui/separator";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Appointment as AppointmentType } from "@/constants/types";
import { deleteAppointment, getAppointment } from "@/db/service";

export default function Appointment() {
  const [foundAppointment, setFoundAppointment] =
    useState<AppointmentType | null>(null);
  const router = useRouter();
  const { id } = useLocalSearchParams();

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
        <AppointmentView
          appointment={foundAppointment}
          onDeleteAppointment={async (id) => {
            await deleteAppointment(id);
            router.push("/");
          }}
        />
      )}
    </>
  );
}
