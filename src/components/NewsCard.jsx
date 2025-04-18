import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Modal,
  Linking,
} from "react-native";
import { BlurView } from "expo-blur";
import { Link } from "expo-router";

const NewsCard = ({ news }) => {
  const [selectedNews, setSelectedNews] = useState(null); // State to manage the selected news
  const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility

  const openModal = () => {
    setSelectedNews(news);
    setModalVisible(true); // Show modal
  };

  const closeModal = () => {
    setModalVisible(false); // Hide modal
    setSelectedNews(null);
  };

  console.log("selected news:", selectedNews);

  const openNewsSource = async (news) => {
    await Linking.openURL(news.url);
  };

  return (
    <View style={styles.card}>
      <Pressable onPress={openModal}>
        {news.urlToImage ? (
          <Image style={styles.image} source={{ uri: news.urlToImage }} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No Image Available</Text>
          </View>
        )}

        <Text style={styles.title}>
          {news.title && news.title.length > 56
            ? `${news.title.slice(0, 56)}...`
            : news.title}
        </Text>

        <Text style={styles.description}>
          {news.description
            ? news.description.length > 120
              ? `${news.description.slice(0, 120)}...`
              : news.description
            : "No description available."}
          {/* <Pressable onPress={openNewsSource}>
            <Text style={styles.readMore}>...Read more</Text>
          </Pressable> */}
          <Link style={styles.readMore} href={news.url}> ...Read More</Link>
        </Text>
      </Pressable>

      {/* Modal Implementation */}
      {selectedNews && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <BlurView
              style={StyleSheet.absoluteFill}
              tint="dark"
              intensity={30}
              experimentalBlurMethod="dimezisBlurView" // Optional for better Android support
            />
            <View style={styles.modalContent}>
              <Pressable onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
              </Pressable>

              {selectedNews.urlToImage ? (
                <Image
                  style={styles.modalImage}
                  source={{ uri: selectedNews.urlToImage }}
                />
              ) : (
                <View style={styles.placeholder}>
                  <Text style={styles.placeholderText}>No Image Available</Text>
                </View>
              )}

              <Text style={styles.modalTitle}>{selectedNews.title}</Text>
              <Text style={styles.modalDescription}>
                {selectedNews.description || "No description available."}
              </Text>

              <View style={styles.sourceContainer}>
                <Text style={styles.sourceText}>
                  Source: {selectedNews.source.name}
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    padding: 4,
  },
  image: {
    width: "90%",
    height: 200,
    resizeMode: "cover",
  },
  placeholder: {
    height: 200,
    width: "100%",
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    color: "#999",
    fontStyle: "italic",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingTop: 10,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 6,
  },
  readMore: {
    color: "#007BFF",
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    overflow: "scroll",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 26,
    width: "94%",
    overflow: "hidden",
    alignItems: "center",
    height: 400,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: "#007B00",
    fontWeight: "bold",
  },
  modalImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    // marginBottom: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  modalDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  sourceContainer: {
    alignSelf: "flex-end",
    marginTop: 10,
    backgroundColor: "#e0ffe0",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  sourceText: {
    fontSize: 12,
    color: "#007B00",
    fontStyle: "italic",
    textAlign: "right",
  },
});
