import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import useNews from "../hooks/useNews"; 
import NewsCard from "./NewsCard";
import { useNavigation } from "@react-navigation/native";


const HeaderSearch = ({onSearch}) => {
  const navigation = useNavigation()
  const [search, setSearch] = useState("");
  const { articles, loading, error } = useNews(search); 
  // console.log("articles", articles);


    // const handleSearch = () => {
    //   if (search.trim()) {
    //     navigation.navigate("SearchResults", { query: search });
    //   }
    // };

    const handleSearch = (text) => {
      setSearch(text)
      onSearch(text)
    }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="black" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search news"
          value={search}
          onChangeText={handleSearch}
          // onSubmitEditing={handleSearch}
          placeholderTextColor="#aaa"
        />
      </View>
      
    </View>
  );
};

export default HeaderSearch;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#f5f5f5",
    paddingTop: 10,
    paddingHorizontal: 10,
    // paddingVertical: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "90%",
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  searchInput: {
    marginLeft: 5,
    width: "90%",
    fontSize: 16,
    color: "#000",
    paddingVertical: 8,
  },
  errorText: {
    color: "red",
    padding: 10,
    textAlign: "center",
  },
});