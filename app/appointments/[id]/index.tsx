import { ActionButton } from "@/components/action-button";
import { Separator } from "@/components/ui/separator";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text } from "react-native";

export default function Appointment() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <View style={{ padding: 20 }}>
      <ActionButton
        text={"Volver a inicio"}
        callback={() => {
          router.push("/");
        }}
        color={"blue"}
      />
      <Separator />
      <Text>Watching appointment ID: {id}</Text>
    </View>
  );
}
