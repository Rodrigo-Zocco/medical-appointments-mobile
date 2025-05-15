import { COLORS } from "@/constants/Colors";
import { Stack } from "expo-router";
import { StatusBar, StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: styles.contentStyle,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  contentStyle: { backgroundColor: COLORS.background, padding: 5 },
});
