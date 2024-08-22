import { ScrollView, View, Text, Pressable, Alert } from "react-native";
import {
  useArticlesContext,
  useArticlesDispatch,
} from "../hooks/useArticlesContext";
import { Titre } from "./Titre";
import { CartArticle } from "./ArticleCart";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export function CartView({ navigation }) {
  const { state } = useArticlesContext();
  const { articles, cart } = state;
  const dispatch = useArticlesDispatch();

  const emptyCart = () => {
    dispatch({ type: "EMPTY_CART" });
  };

  const cartWithArticles = cart.map((item) => {
    const article = articles.find((article) => article.id === item.id);
    return { ...item, ...article };
  });

  const price = state.cart.reduce(
    (acc, article) => acc + article.price * article.quantity,
    0,
  );

  const showAlert = () => {
    Alert.alert(
      "Commande",
      `Votre commande de ${cart.length} article(s) a bien été prise en compte pour un montant total de ${Math.round(price * 100) / 100}€. Elle contient les articles suivants : ${cartWithArticles.map((article) => article.description).join(", ")}
        `,
      [
        {
          text: "Revenir à l'accueil",
          onPress: () => navigation.navigate("Home"),
        },
      ],
    );
    emptyCart();
  };

  return (
    <View style={styles.container}>
      <Titre title="Panier" navigation={navigation} goBack={true} />
      <View style={[styles.card, { borderRadius: 0 }]}>
        <View style={{ width: 150 }}>
          <Text style={styles.text}>Article(s)</Text>
        </View>
        <View style={{ width: 100, alignItems: "center" }}>
          <Text style={styles.text}>Quantité</Text>
        </View>
        <View style={{ width: 120, alignItems: "flex-end" }}>
          <Text style={styles.text}>Prix</Text>
        </View>
      </View>
      <ScrollView>
        {cartWithArticles.map((article) => (
          <CartArticle key={article.id} cartArticle={article} />
        ))}
      </ScrollView>
      {cart.length !== 0 && (
        <Pressable onPress={showAlert} style={styles.commander}>
          <Text style={styles.commanderText}>Commander</Text>
        </Pressable>
      )}
      <View style={styles.footer}>
        <Pressable onPress={emptyCart}>
          <MaterialCommunityIcons
            name="delete-circle-outline"
            size={35}
            color="#f8f7f5"
          />
        </Pressable>
        <Text style={styles.textFooter}>
          Total : {Math.round(price * 100) / 100}
        </Text>
      </View>
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: "#2F232A",
    flex: 1,
    flexGrow: 1,
  },
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
  commander: {
    height: 35,
    backgroundColor: "#63a25a",
    width: 250,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "auto",
    marginBottom: 10,
    borderRadius: 6,
  },
  commanderText: {
    color: "#F8F7F5",
    fontSize: 20,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#988273",
    textAlign: "center",
    height: 55,
  },
  textFooter: {
    fontSize: 24,
    color: "#F8F7F5",
    fontWeight: "bold",
  },
};
