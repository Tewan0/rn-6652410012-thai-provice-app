import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { location } from "../types";

const { width } = Dimensions.get("window");

export default function Detail() {
  const item = useLocalSearchParams() as unknown as location;

  // ตรวจสอบว่า image_url เป็น array หรือไม่ ถ้าส่งมาจาก params อาจต้อง parse ก่อน
  const images = Array.isArray(item.image_url)
    ? item.image_url
    : typeof item.image_url === "string"
      ? (item.image_url as string).split(",") // กรณีส่งมาเป็น string คั่นด้วย comma
      : [];

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <FlatList
          data={images}
          horizontal // ทำให้เลื่อนแนวนอน
          pagingEnabled // ทำให้เลื่อนหยุดทีละหน้า (เหมือน Carousel)
          showsHorizontalScrollIndicator={false}
          keyExtractor={(img, index) => index.toString()}
          renderItem={({ item: uri }) => (
            <Image source={{ uri }} style={styles.image} />
          )}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  imageContainer: { height: 300 }, // กำหนดความสูงของพื้นที่รูปภาพ
  image: { width: width, height: 300, resizeMode: "cover" },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold" },
  description: { fontSize: 16, marginTop: 10, color: "#666" },
});
