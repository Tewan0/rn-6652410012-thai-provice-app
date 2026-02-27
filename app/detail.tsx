import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Detail() {
  const params = useLocalSearchParams();
  const router = useRouter();

  // ฟังก์ชันเพื่อเปิดแอปโทรศัพท์
  const openPhone = () => {
    const phoneNumber = params.phone as string;
    if (phoneNumber) {
      const url = `tel:${phoneNumber}`;
      Linking.openURL(url);
    }
  };

  // ฟังก์ชันสำหรับเปิดแอปแผนที่
  const handleOpenMapApp = () => {
    const latitude = params.latitude;
    const longitude = params.longitude;
    const label = params.name;

    const googleMap = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    const appleMap = `http://maps.apple.com/?q=${label}&ll=${latitude},${longitude}`;

    Linking.canOpenURL(googleMap).then((supported) => {
      if (supported) {
        Linking.openURL(googleMap);
      } else {
        Linking.openURL(appleMap);
      }
    });
  };

  return (
    <ScrollView style={styles.container} bounces={false}>
      {/* ส่วนรูปภาพด้านบน */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: params.image_url as string }}
          style={styles.image}
          resizeMode="cover"
        />
        {/* ปุ่มย้อนกลับ */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* ส่วนเนื้อหารายละเอียด */}
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{params.name}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{params.category}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>รายละเอียด</Text>
          <Text style={styles.description}>{params.description}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={20} color="#666" />
          <Text style={styles.infoText}>{params.address}</Text>
        </View>

        {params.phone && (
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{params.phone}</Text>
          </View>
        )}

        {/* ปุ่ม Action */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, styles.phoneButton]}
            onPress={openPhone}
          >
            <Ionicons name="call" size={20} color="white" />
            <Text style={styles.buttonText}>โทรออก</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.mapButton]}
            onPress={handleOpenMapApp}
          >
            <Ionicons name="map" size={20} color="white" />
            <Text style={styles.buttonText}>นำทาง</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    position: "relative",
    width: width,
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 20,
  },
  contentContainer: {
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    backgroundColor: "white",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  categoryText: {
    color: "#4CAF50",
    fontSize: 12,
    fontWeight: "600",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#444",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 12,
    flex: 0.48,
  },
  phoneButton: {
    backgroundColor: "#2196F3",
  },
  mapButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
});
