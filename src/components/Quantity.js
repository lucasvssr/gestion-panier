import { Text, StyleSheet, Pressable, View } from "react-native";

export function Quantity({ quantity, increment, decrement }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={decrement}>
        <Text style={styles.text}>-</Text>
      </Pressable>
      <Text>{quantity}</Text>
      <Pressable style={styles.button} onPress={increment}>
        <Text style={styles.text}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "auto",
    minWidth: 100,
  },
  button: {
    elevation: 3,
    backgroundColor: "#e09122",
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
