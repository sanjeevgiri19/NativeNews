import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Modal,
  Linking,
  ScrollView,
} from "react-native";
import { BlurView } from "expo-blur";

const NewsCard = ({ news }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openNewsSource = async () => {
    if (news.url) {
      await Linking.openURL(news.url);
    }
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
          <Text style={styles.readMore} onPress={openNewsSource}>
            {" "}
            ...Read More
          </Text>
        </Text>
      </Pressable>

      {/* MODAL  */}

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
            experimentalBlurMethod="dimezisBlurView"
          />
          <ScrollView>
            <View style={styles.modalContent}>
              <Pressable onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
              </Pressable>
              {news.urlToImage ? (
                <Image
                  style={styles.modalImage}
                  source={{ uri: news.urlToImage }}
                />
              ) : (
                <View style={styles.placeholder}>
                  <Text style={styles.placeholderText}>No Image Available</Text>
                </View>
              )}
              <Text style={styles.modalTitle}>
                {news.title || "No title available"}
              </Text>
              <Text style={styles.modalDescription}>
                {news.description || "No description available."}
              </Text>
              <Text style={styles.modalPublished}>
                Published: {news.publishedAt || "Unknown"}
              </Text>

              <View style={styles.sourceContainer}>
                <Text style={styles.sourceText}>
                  Source: {news.source?.name || "Unknown"}
                </Text>
              </View>
              <Pressable style={styles.readFullButton} onPress={openNewsSource}>
                <Text style={styles.readFullButtonText}>Read Full Article</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  card: {
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
    width: "100%",
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
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 26,
    margin: 16,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: "#007BFF",
    fontWeight: "bold",
  },
  modalImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "left",
    marginBottom: 10,
  },
  modalAuthor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  modalPublished: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
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
  },
  readFullButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  readFullButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
