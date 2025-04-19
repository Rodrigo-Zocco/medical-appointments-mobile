import { Appointment } from "@/constants/types";
import { Database } from "./db";

export const getAppointments = async (): Promise<Appointment[]> => {
  const db = await Database.getInstance();
  const appointments = await db.fetchAllAppointments();
  return appointments;
};

export const getAppointment = async (
  id: number
): Promise<Appointment | null> => {
  const db = await Database.getInstance();
  const appointment = await db.fetchAppointment(id);
  return appointment;
};

export const deleteAppointment = async (id: number): Promise<void> => {
  const db = await Database.getInstance();
  await db.deleteAppointment(id);
  return;
};

export const fetchUpcomingAppointment =
  async (): Promise<Appointment | null> => {
    const db = await Database.getInstance();
    return await db.fetchUpcomingAppointment();
  };

export const createAppointment = async (
  appointment: Omit<Appointment, "id">
): Promise<void> => {
  const db = await Database.getInstance();
  await db.createAppointment(appointment);
};

export const updateAppointment = async (
  appointment: Appointment
): Promise<void> => {
  const db = await Database.getInstance();
  return await db.updateAppointment(appointment);
};
