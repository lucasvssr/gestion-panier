import { View, Text, Pressable } from "react-native";
import {
  useArticlesContext,
  useArticlesDispatch,
} from "../hooks/useArticlesContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export function Footer({ navigation }) {
  const { state } = useArticlesContext();
  const dispatch = useArticlesDispatch();

  const emptyCart = () => {
    dispatch({ type: "EMPTY_CART" });
  };

  const totalQuantity = state.cart.reduce(
    (acc, article) => acc + article.quantity,
    0,
  );

  const price = state.cart.reduce(
    (acc, article) => acc + article.price * article.quantity,
    0,
  );

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.header}
        onPress={() => navigation.navigate("Details")}
      >
        <MaterialCommunityIcons name="chevron-up" size={25} color="#f8f7f5" />
      </Pressable>
      <View style={styles.footer}>
        <Text style={styles.text}>Total : {totalQuantity}</Text>
        <Text style={styles.text}>Prix : {Math.round(price * 100) / 100}</Text>
        <Pressable onPress={emptyCart}>
          <MaterialCommunityIcons
            name="delete-circle-outline"
            size={35}
            color="#f8f7f5"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flexDirection: "column",
    backgroundColor: "#988273",
  },
  header: {
    backgroundColor: "#76665c",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: 25,
    width: 150,
    alignSelf: "center",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 25,
  },
  text: {
    fontSize: 24,
    color: "#f8f7f5",
    fontWeight: "bold",
  },
  delete: {
    fontSize: 14,
    color: "#f8f7f5",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#9F5A4E",
    padding: 15,
    borderRadius: 10,
  },
};
