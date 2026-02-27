import { useLocalSearchParams } from "expo-router";
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
  const item = useLocalSearchParams() as any; // ใช้ any ชั่วคราวเพื่อเช็คข้อมูล

  // ป้องกัน Error ด้วยการเช็คประเภทข้อมูลก่อนใช้งาน
  const images = React.useMemo(() => {
    const rawData = item.image_url;
    if (!rawData) return [];

    // ถ้าเป็น Array อยู่แล้ว (กรณีดึงจาก API โดยตรง)
    if (Array.isArray(rawData)) return rawData;

    // ถ้าเป็น String (กรณีส่งผ่าน params มา) ให้ split ด้วย comma
    if (typeof rawData === "string") {
      return rawData.split(",").map((url: string) => url.trim());
    }

    return [];
  }, [item.image_url]);

  const mainImage = images.length > 0 ? images[0] : null;
  const subImages = images.length > 1 ? images.slice(1, 4) : [];

  return (
    <ScrollView style={styles.container}>
      {/* 1. รูปหลักด้านบน */}
      <View style={styles.mainImageContainer}>
        {mainImage ? (
          <Image source={{ uri: mainImage.trim() }} style={styles.mainImage} />
        ) : (
          <View style={styles.placeholder}>
            <Text>ไม่มีรูปภาพ</Text>
          </View>
        )}
      </View>

      {/* 2. ตารางรูปเล็ก (Grid Gallery) */}
      {images.length > 1 && (
        <View style={styles.gridContainer}>
          {subImages.map((uri, index) => (
            <TouchableOpacity key={index} style={styles.subImageWrapper}>
              <Image source={{ uri: uri.trim() }} style={styles.subImage} />
              {/* ถ้าเป็นรูปสุดท้ายและยังมีรูปเหลือ ให้โชว์ +n */}
              {index === 2 && remainingCount > 0 && (
                <View style={styles.overlay}>
                  <Text style={styles.overlayText}>+{remainingCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* 3. ส่วนเนื้อหาข้อมูล */}
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
          {item.phone && <Text style={styles.infoText}>📞 {item.phone}</Text>}
        </View>
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

  gridContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginTop: -30, // ให้รูปเล็กเกยทับรูปใหญ่เล็กน้อยเพื่อความสวยงาม
    justifyContent: "space-between",
  },
  subImageWrapper: {
    width: (width - 50) / 3,
    height: 80,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: "#fff",
  },
  subImage: { width: "100%", height: "100%", resizeMode: "cover" },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: { color: "#fff", fontSize: 18, fontWeight: "bold" },

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
});
