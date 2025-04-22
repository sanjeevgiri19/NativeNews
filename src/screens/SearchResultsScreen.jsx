import React from "react";
import { FlatList, ActivityIndicator, Text, View } from "react-native";
import useNews from "../hooks/useNews";
import NewsCard from "../components/NewsCard";

const SearchResultsScreen = ({ route }) => {
  const { query } = route.params;
  const { articles, loading, error } = useNews(query);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <FlatList
        data={articles}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => <NewsCard news={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SearchResultsScreen;