import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderSearch from "../components/Header";
import NewsCard from "../components/NewsCard";
import useNews from "../hooks/useNews";
import axios from "axios";
import { NEWS_API_KEY } from "@env";

const HomeScreen = ({ route, navigation }) => {
  const API_KEY = NEWS_API_KEY;
  const COUNTRY = "us";
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    articles: searchArticles,
    loading: searchLoading,
    error: searchError,
  } = useNews(searchQuery);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (!searchQuery.trim()) {
      fetchTopHeadlines();
    }
    navigation.setParams({
      onScrollToTop: () => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      },
    });
  }, [searchQuery, navigation]);

  const fetchTopHeadlines = async () => {
    const newsUrl = `https://newsapi.org/v2/top-headlines?country=${COUNTRY}&apiKey=${API_KEY}`;
    try {
      setError(null);
      const res = await axios.get(newsUrl);
      // console.log("response:", res);

      setNews(res.data.articles || []);
    } catch (error) {
      setError(error.message || "Failed to fetch top headlines");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const displayArticles = searchQuery.trim() ? searchArticles : news;
  const displayLoading = searchQuery.trim() ? searchLoading : loading;
  const displayError = searchQuery.trim() ? searchError : error;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <HeaderSearch onSearch={handleSearch} />
        <Text style={styles.CategoryTitle}>
          {searchQuery.trim()
            ? `Search Results for "${searchQuery}"`
            : `Top Headlines in ${COUNTRY.toUpperCase()}`}
        </Text>
        {displayLoading ? (
          <ActivityIndicator size="large" color="#ff0000" />
        ) : displayError ? (
          <Text style={styles.errorText}>{displayError}</Text>
        ) : displayArticles.length === 0 ? (
          <Text style={styles.noResultsText}>No results found</Text>
        ) : (
          <FlatList
            ref={flatListRef}
            data={displayArticles}
            keyExtractor={(item) => item.url}
            renderItem={({ item }) => <NewsCard news={item} />}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            windowSize={5}
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
  },
  CategoryTitle: {
    fontSize: 24,
    marginVertical: 10,
    paddingHorizontal: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    padding: 10,
  },
  noResultsText: {
    textAlign: "center",
    padding: 20,
    fontSize: 16,
    color: "#666",
  },
});
