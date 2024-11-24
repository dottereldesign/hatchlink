// app/_layout.tsx
import React, { useEffect, useState } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { useColorScheme } from "@/hooks/useColorScheme";
import { debugAsyncStorage } from "@/utils/asyncStorageUtil";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  // State for fonts and onboarding status
  const [fontsLoaded] = useFonts({
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
  });
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);

  // Fetch onboarding state from AsyncStorage
  useEffect(() => {
    console.log("[RootLayout] Checking onboarding status in AsyncStorage");
    const checkOnboardingStatus = async () => {
      try {
        console.log("[AsyncStorage] Getting item: hasOnboarded");
        const onboarded = await debugAsyncStorage.getItem("hasOnboarded");
        console.log(
          "[AsyncStorage] Fetched value for key 'hasOnboarded':",
          onboarded
        );
        setHasOnboarded(onboarded === "true");
      } catch (error) {
        console.error("[RootLayout] Error accessing AsyncStorage:", error);
        setHasOnboarded(false); // Default to not onboarded
      }
    };

    checkOnboardingStatus();
  }, []);

  // Navigate based on onboarding state
  useEffect(() => {
    if (fontsLoaded && hasOnboarded !== null) {
      console.log("[RootLayout] Fonts Loaded:", fontsLoaded);
      console.log("[RootLayout] hasOnboarded:", hasOnboarded);

      if (!hasOnboarded) {
        console.log("[RootLayout] Navigating to '/onboarding'");
        router.replace("/onboarding");
      } else {
        console.log("[RootLayout] Navigating to '/'");
        router.replace("/");
      }
    }
  }, [fontsLoaded, hasOnboarded]);

  // Loading screen until fonts and onboarding status are resolved
  if (!fontsLoaded || hasOnboarded === null) {
    console.log("[RootLayout] Fonts Loaded:", fontsLoaded);
    console.log("[RootLayout] hasOnboarded:", hasOnboarded);
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
      </Stack>
    </ThemeProvider>
  );
}
