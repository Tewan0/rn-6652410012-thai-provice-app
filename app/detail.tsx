import * as Linking from "expo-linking";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function Detail() {
  //สร้างตัวแปรเก็บข้อมูลที่ส่งมาจากหน้า Home
  const params = useLocalSearchParams();

  //ฟังก์ชันเพื่อเปิดแอปโทรศัพท์
  const openPhone = () => {
    const phoneNumber = params.phone as string;
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url);
  };

  // ฟังก์ชันสำหรับเปิดแอปแผนที่
  const handleOpenMapApp = () => {
    //สร้างตัวแปรเพื่อเปิด Google Maps
    const googleMap = `https://maps.google.com/?q=${params.latitude},${params.longitude}`;

    //สร้างตัวแปรเพื่อเปิด Apple Maps
    const appleMap = `http://maps.apple.com/?q=${params.name}?&ll=${params.latitude},${params.longitude}`;

    //ตรวจสอบการเปิดแอป Google Maps หรือ Apple Maps โดยยึด Google Maps เป็นหลัก
    Linking.canOpenURL(googleMap).then((supported) => {
      if (supported) {
        Linking.openURL(googleMap);
      } else {
        Linking.openURL(appleMap);
      }
    });
  };

  return <ScrollView style={{ flex: 1 }}></ScrollView>;
}

const styles = StyleSheet.create({});
