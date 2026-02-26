import { supabase } from "@/services/supabase";
import { events, location } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Home() {
  const [locations, setLocations] = useState<location[]>([]);
  const [eventData, setEventData] = useState<events[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // ดึงข้อมูลสถานที่
      const { data: locData, error: locError } = await supabase
        .from("location")
        .select("*");
      if (locError) {
        Alert.alert("คำเตือน", "ไม่สามารถดึงข้อมูลสถานที่ได้");
      } else {
        setLocations(locData || []);
      }

      // ดึงข้อมูลกิจกรรม (Events)
      const { data: envData, error: envError } = await supabase
        .from("events")
        .select("*");
      if (!envError && envData && envData.length > 0) {
        setEventData(envData);
      }
    };
    fetchData();
  }, []);

  // ส่วนหัวของรายการ (รูปภาพกิจกรรมขนาดใหญ่)
  const renderHeader = () => {
    if (eventData.length === 0) return null;

    // เลือกกิจกรรมแรกมาแสดงเป็น Highlight
    const featuredEvent = eventData[0];
    return (
      <View style={styles.eventContainer}>
        <Image
          source={{ uri: featuredEvent.image_url }}
          style={styles.eventImage}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.gradient}
        />
        <View style={styles.eventBadge}>
          <Text style={styles.eventBadgeText}>งานประจำปี</Text>
        </View>
      </View>
    );
  };

  const renderLocationItem = ({ item }: { item: location }) => (
    <TouchableOpacity
      style={styles.cardItem}
      onPress={() => {
        router.push({
          pathname: "/detail",
          params: { ...item },
        });
      }}
    >
      <Image source={{ uri: item.image_url }} style={styles.locationImage} />
      <View style={styles.textContainer}>
        <Text style={styles.locationName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.locationCategory}>
          {item.category || "สถานที่ท่องเที่ยว"}
        </Text>
        <Text style={styles.locationAddress} numberOfLines={2}>
          {item.address}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderLocationItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  listContent: {
    paddingBottom: 20,
  },
  eventContainer: {
    width: width,
    height: 300,
    backgroundColor: "#000",
    marginBottom: 15,
  },
  eventImage: {
    width: "100%",
    height: "100%",
    opacity: 0.8,
  },
  eventBadge: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#ff4757",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  eventBadgeText: {
    color: "#fff",
    fontFamily: "Prompt_700Bold",
    fontSize: 12,
  },
  eventInfo: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  eventTitle: {
    color: "#fff",
    fontSize: 26,
    fontFamily: "Prompt_700Bold",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  eventDate: {
    color: "#dfe4ea",
    fontSize: 14,
    fontFamily: "Prompt_400Regular",
  },
  eventDescription: {
    color: "#dfe4ea",
    fontSize: 14,
    fontFamily: "Prompt_400Regular",
    marginTop: 8,
  },
  eventPeriod: {
    color: "#dfe4ea",
    fontSize: 12,
    fontFamily: "Prompt_400Regular",
    marginTop: 4,
  },
  cardItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  locationImage: {
    width: 110,
    height: 120,
  },
  textContainer: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  locationName: {
    fontSize: 17,
    fontFamily: "Prompt_700Bold",
    color: "#2f3542",
    marginBottom: 4,
  },
  locationCategory: {
    fontSize: 12,
    color: "#ff4757",
    fontFamily: "Prompt_400Regular",
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 13,
    color: "#747d8c",
    fontFamily: "Prompt_400Regular",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "70%",
  },
});
