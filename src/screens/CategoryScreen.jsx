import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  useColorScheme,
} from "react-native";
import NewsCard from "../components/NewsCard";
import {NEWS_API_KEY} from '@env'

// const API_KEY = "fc16b7d092044241b6f08c7eae5cddf3"; // Replace with your News API Key

const CategoryScreen = ({ route }) => {
  const { category } = route.params;
  const colorScheme = useColorScheme(); // For dark mode support
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetchNews();
  }, [category]); // Re-fetch when category changes

  const fetchNews = async () => {
    setLoading(true);
    try {
      // Corrected News API URL
      const newsURL = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${NEWS_API_KEY}`;
      const response = await fetch(newsURL);
      const data = await response.json();
      console.log(data);
      

      if (data.status === "ok") {
        setNews(data.articles);
        console.log("news", news);
        
      } else {
        console.error("API Error:", data.message);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={colorScheme === "dark" ? "#60A5FA" : "#2563EB"}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#111827" : "#F3F4F6" },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: colorScheme === "dark" ? "#F3F4F6" : "#111827" },
        ]}
      >
        {category.toUpperCase()} NEWS
      </Text>
      <FlatList
        data={news}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => <NewsCard news={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6", // Light gray for light mode
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
  },
  listContent: {
    paddingBottom: 16,
  },
});
