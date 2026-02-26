import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/backgroundUdonthani2.png")}
        style={styles.imageBG}
      />
      <View style={styles.ripple}>
        <Image
          source={require("@/assets/images/iconUdonthani.jpg")}
          style={styles.image}
        />
      </View>
      <Text style={styles.text}>ประชาสัมพันธ์จังหวัดอุดรธานี</Text>
      <ActivityIndicator
        size="large"
        color="rgb(0, 0, 0)"
        style={{ marginTop: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontFamily: "Prompt_700Bold",
    color: "rgb(0, 0, 0)",
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 160,
    borderColor: "rgb(0, 0, 0)",
    borderWidth: 4,
  },
  ripple: {
    width: 250,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 160,
  },
  imageBG: {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.2,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
