import { ActionButton } from "@/components/action-button";
import AppointmentForm from "@/components/appointment-form";
import { Separator } from "@/components/ui/separator";
import { Appointment } from "@/constants/types";
import { useRouter } from "expo-router";
import { View, SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function CreateAppointment() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ActionButton
            text={"Volver A inicio"}
            callback={() => {
              router.push("/");
            }}
            color={"blue"}
          />
          <Separator />
        </View>

        <AppointmentForm
          onSubmit={(appointment: Omit<Appointment, "id">) => {
            console.log("To create: ", appointment);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    padding: 20,
  },
});
