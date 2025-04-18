// npm i lottie-react-native

// import LottieView from "lottie-react-native";
import LottieView from 'lottie-react-native'
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Home");
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/Lottie-animation.json")}
        loop
        autoPlay
        style={styles.splashCard}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  splashCard: {
    width: 220,
    height: 200,
  },
});
