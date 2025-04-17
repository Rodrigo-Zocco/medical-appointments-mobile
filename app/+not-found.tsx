import { ActionButton } from "@/components/action-button";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Error:</Text>
      <Text style={styles.title}>Esta página no existe.</Text>
      <ActionButton
        text={"Volver A inicio"}
        callback={() => {
          router.push("/");
        }}
        color={"blue"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
});
