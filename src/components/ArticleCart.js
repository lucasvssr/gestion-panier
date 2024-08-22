import { View, Text } from "react-native";
import { Quantity } from "./Quantity";
import { useQuantity } from "../hooks/useQuantity";

export function CartArticle({ cartArticle }) {
  const { increment, decrement } = useQuantity(
    cartArticle,
    cartArticle.quantity,
  );

  return (
    <View key={cartArticle.id} style={styles.card}>
      <View style={{ width: 150 }}>
        <Text style={styles.text}>{cartArticle.description}</Text>
      </View>
      <View
        style={{ width: 100, alignItems: "center", justifyContent: "center" }}
      >
        <Quantity
          quantity={cartArticle.quantity}
          increment={increment}
          decrement={decrement}
        />
      </View>
      <View
        style={{ width: 120, alignItems: "flex-end", justifyContent: "center" }}
      >
        <Text style={styles.text}>
          {Math.round(cartArticle.price * cartArticle.quantity * 100) / 100}
        </Text>
      </View>
    </View>
  );
}

const styles = {
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F8F7F5",
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  text: {
    fontSize: 20,
    color: "#988273",
    fontWeight: "bold",
  },
};
