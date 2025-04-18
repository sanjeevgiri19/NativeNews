import { Stack } from "expo-router";
import Index from "./index";

export default function RootLayout() {
  // return <Stack />        //the extra header in top most part of app is bcz of this
  return <Index />;
}
