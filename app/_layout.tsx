import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: styles.contentStyle,
      }}
    />
  );
}

const styles = StyleSheet.create({
  contentStyle: { backgroundColor: "#f79d89", padding: 5 },
});
