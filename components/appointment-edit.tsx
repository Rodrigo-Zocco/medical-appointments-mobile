"use client";

import { COLORS } from "@/constants/Colors";
import type { Appointment } from "@/constants/types";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";

type FormErrors = {
  date?: string;
  location?: string;
  name?: string;
};

export default function EditAppointmentForm({
  appointment,
  onSubmit,
}: {
  appointment: Appointment;
  onSubmit: (appointment: Appointment) => Promise<void>;
}) {
  const [date, setDate] = useState(new Date());
  const [doctorName, setDoctorName] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const [selectedDay, setSelectedDay] = useState(date.getDate());
  const [selectedMonth, setSelectedMonth] = useState(date.getMonth());
  const [selectedYear, setSelectedYear] = useState(date.getFullYear());
  const [selectedHour, setSelectedHour] = useState(date.getHours());
  const [selectedMinute, setSelectedMinute] = useState(date.getMinutes());

  const [IsInvalidDate, setIsInvalidDate] = useState(false);

  useEffect(() => {
    if (appointment) {
      const appointmentDate = new Date(appointment.date);
      setDate(appointmentDate);
      setSelectedDay(appointmentDate.getDate());
      setSelectedMonth(appointmentDate.getMonth());
      setSelectedYear(appointmentDate.getFullYear());
      setSelectedHour(appointmentDate.getHours());
      setSelectedMinute(appointmentDate.getMinutes());
      setDoctorName(appointment.doctorName ? appointment.doctorName : "-");
      setLocation(appointment.location);
      setName(appointment.name);
      setAdditionalInfo(
        appointment.additionalInfo ? appointment.additionalInfo : "-"
      );
    }
  }, [appointment]);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "Enero (1)",
    "Febrero (2)",
    "Marzo (3)",
    "Abril (4)",
    "Mayo (5)",
    "Junio (6)",
    "Julio (7)",
    "Agosto (8)",
    "Septiembre (9)",
    "Octubre (10)",
    "Noviembre (11)",
    "Diciembre (12)",
  ];
  const years = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() + i
  );
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!date) {
      newErrors.date = "Indica la fecha";
    }

    if (!location.trim()) {
      newErrors.location = "Indica la ubicacion";
    }

    if (!name.trim()) {
      newErrors.name = "Indica el nombre del turno";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        id: appointment.id,
        date,
        doctorName: doctorName.trim() || "-",
        location,
        name,
        additionalInfo: additionalInfo.trim() || "-",
      });
    }
  };

  const confirmDateSelection = () => {
    const newDate = new Date(selectedYear, selectedMonth, selectedDay);

    const obtainedDay = newDate.getDate();
    if (obtainedDay !== selectedDay) {
      setIsInvalidDate(true);
    } else {
      setIsInvalidDate(false);
      newDate.setHours(selectedHour);
      newDate.setMinutes(selectedMinute);
      setDate(newDate);
      setDatePickerVisible(false);
    }
  };

  const confirmTimeSelection = () => {
    const newDate = new Date(date);
    newDate.setHours(selectedHour);
    newDate.setMinutes(selectedMinute);
    setDate(newDate);
    setTimePickerVisible(false);
  };

  const formatDate = (date: Date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const PickerItem = ({
    label,
    selected,
    onPress,
  }: {
    label: string | number;
    selected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[styles.pickerItem, selected && styles.pickerItemSelected]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.pickerItemText,
          selected && styles.pickerItemTextSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar turno</Text>
      <Text style={styles.subtitle}>Los campos con * son obligatorios</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre del turno *</Text>
        <TextInput
          style={[
            styles.input,
            errors.name && { borderColor: "red", borderWidth: 1 },
          ]}
          value={name}
          onChangeText={setName}
          placeholder="Ingresa la especialidad"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Fecha *</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setDatePickerVisible(true)}
        >
          <Text>{formatDate(date)}</Text>
        </TouchableOpacity>
        {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Hora *</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setTimePickerVisible(true)}
        >
          <Text>{formatTime(date)}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre del doctor (Opcional)</Text>
        <TextInput
          style={styles.input}
          value={doctorName}
          onChangeText={setDoctorName}
          placeholder="Escribi el nombre del doctor"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Ubicación *</Text>
        <TextInput
          style={[
            styles.input,
            errors.location && { borderColor: "red", borderWidth: 1 },
          ]}
          value={location}
          onChangeText={setLocation}
          placeholder="Escribi el nombre del hospital"
        />
        {errors.location && (
          <Text style={styles.errorText}>{errors.location}</Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Información adicional (opcional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={additionalInfo}
          onChangeText={setAdditionalInfo}
          placeholder="Ingresa datos adicionales"
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Guardar cambios</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={datePickerVisible}
        onRequestClose={() => setDatePickerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Fecha del turno</Text>
            <View style={styles.pickerContainer}>
              <ScrollView style={styles.pickerColumn}>
                <Text style={styles.pickerHeader}>Dia</Text>
                {days.map((day) => (
                  <PickerItem
                    key={`day-${day}`}
                    label={day}
                    selected={day === selectedDay}
                    onPress={() => setSelectedDay(day)}
                  />
                ))}
              </ScrollView>

              <ScrollView style={styles.pickerColumn}>
                <Text style={styles.pickerHeader}>Mes</Text>
                {months.map((month, index) => (
                  <PickerItem
                    key={`month-${index}`}
                    label={month}
                    selected={index === selectedMonth}
                    onPress={() => setSelectedMonth(index)}
                  />
                ))}
              </ScrollView>

              <ScrollView style={styles.pickerColumn}>
                <Text style={styles.pickerHeader}>Año</Text>
                {years.map((year) => (
                  <PickerItem
                    key={`year-${year}`}
                    label={year}
                    selected={year === selectedYear}
                    onPress={() => setSelectedYear(year)}
                  />
                ))}
              </ScrollView>
            </View>

            {IsInvalidDate && (
              <Text
                style={{
                  ...styles.modalTitle,
                  color: "red",
                  marginBottom: 10,
                  marginTop: 10,
                }}
              >
                Fecha invalida
              </Text>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setDatePickerVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmDateSelection}
              >
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={timePickerVisible}
        onRequestClose={() => setTimePickerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Hora del turno</Text>

            <View style={styles.pickerContainer}>
              <ScrollView style={styles.pickerColumn}>
                <Text style={styles.pickerHeader}>Hora</Text>
                {hours.map((hour) => (
                  <PickerItem
                    key={`hour-${hour}`}
                    label={hour.toString().padStart(2, "0")}
                    selected={hour === selectedHour}
                    onPress={() => setSelectedHour(hour)}
                  />
                ))}
              </ScrollView>

              <ScrollView style={styles.pickerColumn}>
                <Text style={styles.pickerHeader}>Minutos</Text>
                {minutes.map((minute) => (
                  <PickerItem
                    key={`minute-${minute}`}
                    label={minute.toString().padStart(2, "0")}
                    selected={minute === selectedMinute}
                    onPress={() => setSelectedMinute(minute)}
                  />
                ))}
              </ScrollView>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setTimePickerVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmTimeSelection}
              >
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.tertiary,
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: COLORS.tertiary,
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  errorText: {
    color: COLORS.error,
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: COLORS.success,
    padding: 15,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 0,
    width: "100%",
    maxHeight: "100%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 200,
  },
  pickerColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  pickerHeader: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  pickerItem: {
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  pickerItemSelected: {
    backgroundColor: COLORS.extra,
  },
  pickerItemText: {
    fontSize: 16,
  },
  pickerItemTextSelected: {
    color: COLORS.secondary,
    fontWeight: "bold",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: COLORS.error,
  },
  confirmButton: {
    backgroundColor: COLORS.success,
  },
  modalButtonText: {
    color: COLORS.secondary,
    fontWeight: "bold",
  },
});
