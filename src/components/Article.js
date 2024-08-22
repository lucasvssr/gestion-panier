import { View, Text, Image } from "react-native";
import { useArticlesContext } from "../hooks/useArticlesContext";
import { Quantity } from "./Quantity";
import { useQuantity } from "../hooks/useQuantity";

export function Article({ article: { id } }) {
  const { state } = useArticlesContext();
  const { articles } = state;
  const article = articles.find((article) => article.id === id);
  const cartItem = state.cart.find((item) => item.id === id);
  const quantityCart = cartItem ? cartItem.quantity : 0;
  const { quantity, increment, decrement } = useQuantity(article, quantityCart);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>{article.description}</Text>
        <Text style={styles.price}>{article.price}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Image
          source={{ uri: "http://localhost:7000" + article.image }}
          style={{ width: 100, height: 100 }}
          description={article.type}
        />
        <Quantity
          quantity={quantity}
          increment={increment}
          decrement={decrement}
        />
      </View>
    </View>
  );
}

const styles = {
  container: {
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
  price: {
    fontSize: 20,
    color: "#9F5A4E",
    fontWeight: "bold",
  },
};
