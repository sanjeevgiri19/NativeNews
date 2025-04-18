import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import { SafeAreaView } from "react-native-safe-area-context";
// import {NEWS_API_KEY} from '@env'

const HomeScreen = () => {
  const API_KEY = "fc16b7d092044241b6f08c7eae5cddf3";
  const COUNTRY = "us";
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const newsUrl = `https://newsapi.org/v2/top-headlines?country=${COUNTRY}&apiKey=${API_KEY}`;
    try {
      const res = await axios.get(newsUrl);
      // console.log(res.data);
      setNews(res.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
      console.error("Error fetching news:", error.message);
      console.log("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text
          style={styles.CategoryTitle}
        >{`Top Headlines in ${COUNTRY.toUpperCase()}`}</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#ff0000" />
        ) : (
          <FlatList
            data={news}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <NewsCard news={item} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  CategoryTitle: {
    fontSize: 30,
    marginVertical: 10,
    backgroundColor: "#eee",
    paddingHorizontal: 25,
    fontWeight: "bold",
    paddingVertical: 10,
  },
});
