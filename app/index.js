import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../src/screens/HomeScreen";
import CategoryScreen from "../src/screens/CategoryScreen";
import SplashScreen from "../src/screens/SplashScreen";
import HeaderSearch from '../src/components/Header'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    screenOptions={{ headerShown: true }}
  >
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={({ navigations }) => ({
        headerRight: () => <HeaderSearch />,
        title: "IXSN",
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
  // Remove unused styles or apply them in a screen if needed
});
