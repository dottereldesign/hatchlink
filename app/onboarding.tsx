import React, { useEffect, useState } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { useColorScheme } from "@/hooks/useColorScheme";
import { debugAsyncStorage } from "@/utils/asyncStorageUtil";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
  });

  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);

  // Fetch onboarding state from AsyncStorage
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboarded = await debugAsyncStorage.getItem("hasOnboarded");
        setHasOnboarded(onboarded === "true");
      } catch (error) {
        console.error("Error accessing AsyncStorage:", error);
        setHasOnboarded(false); // Fallback to false on error
      }
    };

    checkOnboardingStatus();
  }, []);

  // Ensure all conditions are resolved before setting `ready` state
  useEffect(() => {
    if (fontsLoaded && hasOnboarded !== null) {
      setReady(true);
    }
  }, [fontsLoaded, hasOnboarded]);

  // Show loading screen until app is ready
  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Define screens */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
