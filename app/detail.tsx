import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const { width } = Dimensions.get("window");

export default function Detail() {
  const item = useLocalSearchParams() as any;

  // จัดการข้อมูลรูปภาพให้เป็น Array เสมอ
  const images = React.useMemo(() => {
    const rawData = item.image_url;
    if (!rawData) return [];
    if (Array.isArray(rawData)) return rawData;
    if (typeof rawData === "string") {
      return rawData.split(",").map((url: string) => url.trim());
    }
    return [];
  }, [item.image_url]);

  const mainImage = images.length > 0 ? images[0] : null;

  const handlePhoneCall = (phone: string) => {
    const phoneNumber = item.phone as string;
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url);
  };

  // ฟังก์ชันสำหรับเปิดแอปแผนที่
  const handleOpenMapApp = () => {
    //สร้างตัวแปรเพื่อเปิด Google Maps
    const googleMap = `https://maps.google.com/?q=${item.latitude},${item.longitude}`;

    //สร้างตัวแปรเพื่อเปิด Apple Maps
    const appleMap = `http://maps.apple.com/?q=${item.name}?&ll=${item.latitude},${item.longitude}`;

    //ตรวจสอบการเปิดแอป Google Maps หรือ Apple Maps โดยยึด Google Maps เป็นหลัก
    Linking.canOpenURL(googleMap).then((supported) => {
      if (supported) {
        Linking.openURL(googleMap);
      } else {
        Linking.openURL(appleMap);
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* 1. รูปหลักด้านบน */}
      <View style={styles.mainImageContainer}>
        {mainImage ? (
          <Image source={{ uri: mainImage }} style={styles.mainImage} />
        ) : (
          <View style={styles.placeholder}>
            <Text>ไม่มีรูปภาพ</Text>
          </View>
        )}
      </View>

      {/* 3. เนื้อหาข้อมูล */}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>รายละเอียด</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            📍 {item.address || "ไม่ระบุที่อยู่"}
          </Text>
          {item.phone && (
            <TouchableOpacity onPress={() => handlePhoneCall(item.phone)}>
              <Text style={styles.phoneText}>📞 {item.phone}</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text>แผนที่</Text>
        <MapView
          style={{ width: "100%", height: 300, marginTop: 10 }}
          initialRegion={{
            latitude: parseFloat(item.latitude as string),
            longitude: parseFloat(item.longitude as string),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(item.latitude as string),
              longitude: parseFloat(item.longitude as string),
            }}
            title={item.name as string}
            description={item.description as string}
            onPress={handleOpenMapApp}
          />
        </MapView>
      </View>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  mainImageContainer: { width: width, height: 280 },
  mainImage: { width: "100%", height: "100%", resizeMode: "cover" },
  placeholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },

  content: { padding: 20, marginTop: 10 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#2D3436", flex: 1 },
  categoryBadge: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  categoryText: { color: "#1976D2", fontSize: 12, fontWeight: "600" },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#636E72",
    lineHeight: 24,
    marginBottom: 20,
  },

  infoBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#1976D2",
  },
  infoText: { fontSize: 14, color: "#2D3436", marginBottom: 5 },
  phoneText: {
    fontSize: 14,
    color: "#1976D2",
    marginBottom: 5,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
