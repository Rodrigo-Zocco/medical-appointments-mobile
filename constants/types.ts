export type Appointment = {
  id: number;
  date: Date;
  doctorName?: string;
  location: string;
  name: string;
  additionalInfo?: string;
};
