import { View, Text, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export function Titre({ title, navigation, goBack }) {
  const viewStyle = goBack ? styles.cart : styles.home;
  return (
    <View style={viewStyle}>
      {goBack && (
        <Pressable onPress={() => navigation.goBack()} style={styles.back}>
          <MaterialCommunityIcons
            name="chevron-down"
            size={24}
            color="#f8f7f5"
          />
        </Pressable>
      )}
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = {
  home: {
    backgroundColor: "#988273",
    height: 40,
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  cart: {
    backgroundColor: "#988273",
    height: 60,
    flexDirection: "column",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  back: {
    backgroundColor: "#76665c",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: 25,
    width: 150,
    alignSelf: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    color: "#f8f7f5",
    fontWeight: "bold",
    textAlignVertical: "center",
  },
};
