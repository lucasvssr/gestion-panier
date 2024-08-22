import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import { ArticlesProvider } from "./src/hooks/useArticlesContext";
import { ArticleView } from "./src/components/ArticleView";
import { NavigationContainer } from "@react-navigation/native";
import { CartView } from "./src/components/CartView";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ArticlesProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              gestureEnabled: false,
              cardOverlayEnabled: true,
              ...TransitionPresets.ModalTransition,
            }}
          >
            <Stack.Screen name="Home" component={ArticleView} />
            <Stack.Screen name="Details" component={CartView} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </ArticlesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
