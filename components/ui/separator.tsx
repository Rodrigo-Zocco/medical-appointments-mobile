import { COLORS } from "@/constants/Colors";
import { View, StyleSheet } from "react-native";

export function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: COLORS.tertiary,
    marginVertical: 10,
  },
});
