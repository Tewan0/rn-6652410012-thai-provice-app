import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function DetailScreen() {
  const item = useLocalSearchParams();
  const images = Array.isArray(item.image_url)
    ? item.image_url
    : [item.image_url];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item: uri }) => (
            <Image source={{ uri }} style={styles.image} resizeMode="cover" />
          )}
        />

        <View style={styles.pagination}>
          {images.length > 1 &&
            images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      index === activeIndex ? "#FF6B6B" : "#D3D3D3",
                  },
                ]}
              />
            ))}
        </View>
      </View>

      {/* ส่วนรายละเอียดด้านล่าง */}
      <View style={styles.details}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.address}>{item.address}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  carouselContainer: { height: 300, position: "relative" },
  image: { width: width, height: 300 },
  pagination: {
    position: "absolute",
    bottom: 15,
    flexDirection: "row",
    alignSelf: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  details: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 5 },
  address: { fontSize: 16, color: "#747d8c", marginBottom: 10 },
  description: { fontSize: 16, color: "#444", lineHeight: 22 },
});
