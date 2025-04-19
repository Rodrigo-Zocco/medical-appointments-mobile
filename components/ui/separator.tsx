import { View, StyleSheet } from "react-native";

export function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "rgb(0, 0, 0)",
    marginVertical: 10,
  },
});
