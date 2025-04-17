import { View, StyleSheet } from "react-native";

export function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "rgb(231, 16, 16)",
    marginVertical: 10,
  },
});
