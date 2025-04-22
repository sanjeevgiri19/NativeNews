import { Pressable, StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../src/screens/HomeScreen";
import CategoryScreen from "../src/screens/CategoryScreen";
import SplashScreen from "../src/screens/SplashScreen";
import HeaderSearch from "../src/components/Header";
import SearchResultsScreen from "../src/screens/SearchResultsScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    screenOptions={{ headerShown: true }}
    drawerContentOptions={{
    activeTintColor: '#e91e63',
    // itemStyle: { marginVertical: 5 },
  }}
  >
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={({ route }) => ({
        headerTitle: () => (
          <Pressable onPress={route.params?.onScrollToTop}>
            <Text style={styles.headerTitle}>IXSN</Text>
          </Pressable>
        ),
        // headerRight: () => <HeaderSearch />, 
        drawerLabel: "Home",
        headerTitleStyle: {
          fontSize: 20,
          marginLeft: 10,
        },
      })}
    />
    <Drawer.Screen
      name="Sports"
      component={CategoryScreen}
      initialParams={{ category: "sports" }}
    />
    <Drawer.Screen
      name="Business"
      component={CategoryScreen}
      initialParams={{ category: "business" }}
    />
    <Drawer.Screen
      name="Entertainment"
      component={CategoryScreen}
      initialParams={{ category: "entertainment" }}
    />
    <Drawer.Screen
      name="Science"
      component={CategoryScreen}
      initialParams={{ category: "science" }}
    />
    <Drawer.Screen
      name="Technology"
      component={CategoryScreen}
      initialParams={{ category: "technology" }}
    />
    <Drawer.Screen
      name="Health"
      component={CategoryScreen}
      initialParams={{ category: "health" }}
    />
  </Drawer.Navigator>
);

const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Home" component={DrawerNavigator} />
    <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
  </Stack.Navigator>
);

export default function Index() {
  return (
    // <NavigationContainer>
      <MainStack />
    // </NavigationContainer> 
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
