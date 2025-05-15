import { COLORS } from "@/constants/Colors";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export function ActionButton({
  text,
  callback,
  color,
}: {
  text: string;
  callback: () => void;
  color: "red" | "green" | "blue";
}) {
  return (
    <TouchableOpacity
      style={[styles.button, styles[color]]}
      onPress={callback}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  text: {
    color: COLORS.secondary,
    fontSize: 18,
    fontWeight: "bold",
  },
  red: {
    backgroundColor: COLORS.error,
  },
  green: {
    backgroundColor: COLORS.success,
  },
  blue: {
    backgroundColor: COLORS.extra,
  },
});
