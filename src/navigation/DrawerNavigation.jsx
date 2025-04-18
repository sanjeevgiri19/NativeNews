import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";

const Drawer = createDrawerNavigator();

// const DrawerNavigation = () => {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen name="Home" component={HomeScreen} />
//         <Drawer.Screen name="Sports" component={CategoryScreen} />
//         <Drawer.Screen name="Education" component={CategoryScreen} />
//         <Drawer.Screen name="Business" component={CategoryScreen} />
//         <Drawer.Screen name="Science & Tech" component={CategoryScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// };

const DrawerNavigator = () => {
  <Drawer.Navigator>
    {/* <Drawer.Screen name="Home" component={HomeScreen} /> */}
    {/* <Drawer.Screen name="Splash" component={SplashScreen} /> */}
    <Drawer.Screen name="Home" component={HomeScreen} />
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
  </Drawer.Navigator>;
};

export default DrawerNavigator;
