import {
  Prompt_400Regular,
  Prompt_700Bold,
  useFonts,
} from "@expo-google-fonts/prompt";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Prompt_400Regular,
    Prompt_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="home"
        options={{
          headerTitle: "สถานที่แนะนำในจังหวัดอุดรธานี",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          headerTitle: "รายละเอียด",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
