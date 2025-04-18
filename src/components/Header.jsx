import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const HeaderSearch = () => {
  const [search, setSearch] = useState("");
  console.log(search);
  

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="black" />
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        // value={search}
        onChange={(text) => setSearch(text)}
        placeholderTextColor="#aaa"
      />
    </View>
  );
};

export default HeaderSearch;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // marginRight: 10,
    backgroundColor: "#fff",
    width: "90%",
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  searchInput: {
    marginLeft: 5,
    // width: 100,
    // height: 40,
    width: '90%',
    fontSize: 16,
    color: "#000",
  },
});
