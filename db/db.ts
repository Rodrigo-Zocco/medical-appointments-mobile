import { Appointment } from "@/constants/types";
import * as SQLite from "expo-sqlite";

export class Database {
  private static instance: Database;
  private database!: SQLite.SQLiteDatabase;

  private constructor() {}

  private async init() {
    this.database = await SQLite.openDatabaseAsync("appointments.db");
    await this.database.execAsync(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        doctorName TEXT,
        location TEXT NOT NULL,
        name TEXT NOT NULL,
        additionalInfo TEXT
      );
    `);
  }

  static async getInstance(): Promise<Database> {
    if (!Database.instance) {
      const instance = new Database();
      await instance.init();
      Database.instance = instance;
    }
    return Database.instance;
  }

  async fetchAllAppointments(): Promise<Appointment[]> {
    return await this.database.getAllAsync("SELECT * FROM appointments");
  }

  async fetchAppointment(id: number): Promise<Appointment | null> {
    return await this.database.getFirstAsync(
      "SELECT * FROM appointments WHERE id = ?",
      [id]
    );
  }

  async createAppointment(
    appointment: Omit<Appointment, "id">
  ): Promise<number> {
    const { date, doctorName, location, name, additionalInfo } = appointment;
    const result = await this.database.runAsync(
      `INSERT INTO appointments (date, doctorName, location, name, additionalInfo)
       VALUES (?, ?, ?, ?, ?)`,
      [
        date.toISOString(),
        doctorName ?? null,
        location,
        name,
        additionalInfo ?? null,
      ]
    );
    return result.lastInsertRowId!;
  }

  async updateAppointment(appointment: Appointment): Promise<void> {
    const { id, date, doctorName, location, name, additionalInfo } =
      appointment;
    await this.database.runAsync(
      `UPDATE appointments
       SET date = ?, doctorName = ?, location = ?, name = ?, additionalInfo = ?
       WHERE id = ?`,
      [
        date.toISOString(),
        doctorName ?? null,
        location,
        name,
        additionalInfo ?? null,
        id,
      ]
    );
  }

  async deleteAppointment(id: number): Promise<boolean> {
    const result = await this.database.runAsync(
      `DELETE FROM appointments WHERE id = ?`,
      [id]
    );
    return result.changes > 0;
  }

  async fetchUpcomingAppointment(): Promise<Appointment | null> {
    const now = new Date().toISOString();

    const row = await this.database.getFirstAsync<Appointment>(
      `SELECT * FROM appointments
       WHERE date >= ?
       ORDER BY date ASC
       LIMIT 1`,
      [now]
    );

    if (!row) return null;

    return {
      ...row,
      date: new Date(row.date),
    };
  }
}
