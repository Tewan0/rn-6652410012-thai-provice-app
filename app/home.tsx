import { supabase } from "@/services/supabase";
import { events, location } from "@/types";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  // สร้าง state สำหรับเก็บข้อมูลสถานที่ท่องเที่ยวและกิจกรรม
  const [locations, setLocations] = useState<location[]>([]);
  const [events, setEvents] = useState<events[]>([]);

  //ดึงข้อมูลสถานที่ท่องเที่ยวจาก Supabase
  useEffect(() => {
    const fetchLocations = async () => {
      const { data, error } = await supabase.from("locations").select("*");
      if (error) {
        Alert.alert("คำเตือน", "เกิดข้อผิดพลาดในการดึงข้อมูลสถานที่ท่องเที่ยว");
      } else {
        setLocations(data);
      }
    };
    fetchLocations();
  }, []);

  //สร้างหน้าตา component สำหรับแสดงข้อมูลสถานที่ท่องเที่ยวและกิจกรรม
  const renderLocationItem = ({ item }: { item: location }) => (
    <TouchableOpacity
      style={styles.cardItem}
      onPress={() => {
        router.push({
          pathname: "/detail",
          params: {
            id: item.id,
            name: item.name,
            description: item.description,
            category: item.category,
            phone: item.phone,
            address: item.address,
            latitude: item.latitude,
            longitude: item.longitude,
            image_url: item.image_url,
          },
        });
      }}
    >
      <Image source={{ uri: item.image_url }} style={styles.locationImage} />
      <View>
        <Text style={styles.locationName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View>
      <FlatList
        contentContainerStyle={{ padding: 5 }}
        showsVerticalScrollIndicator={true} //แสดง scroll bar
        data={locations} //กำหนดข้อมูลที่จะแสดงใน FlatList
        keyExtractor={(item) => item.id} //กำหนด key สำหรับแต่ละรายการ
        renderItem={renderLocationItem} //กำหนดฟังก์ชันสำหรับแสดงแต่ละรายการ
      />
    </View>
  );
}

const styles = StyleSheet.create({
  locationName: {
    fontSize: 16,
    fontFamily: "Prompt_700Bold",
    marginLeft: 10,
  },
  locationImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 8,
    padding: 10,
    borderRadius: 5,
  },
  locationItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
  },
});
