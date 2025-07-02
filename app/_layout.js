import { Stack } from "expo-router";
import Index from "./index";
import { NavigationContainer } from "@react-navigation/native";


export default function RootLayout() {
  <NavigationContainer independent={true}>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  </NavigationContainer>;
}
