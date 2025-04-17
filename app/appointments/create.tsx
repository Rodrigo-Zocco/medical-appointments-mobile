import { ActionButton } from "@/components/action-button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";

export default function CreateAppointment() {
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <ActionButton
        text={"Volver A inicio"}
        callback={() => {
          router.push("/");
        }}
        color={"blue"}
      />
      <Separator />
      <Text>Create appointment</Text>
    </View>
  );
}
