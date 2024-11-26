// app/_layout.tsx
import React, { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";

// Helper for timestamped logs
const timestamp = () => new Date().toISOString();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  // State for fonts and onboarding status
  const [fontsLoaded] = useFonts({
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsExtraBold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
  });

  const hasOnboarded = useOnboardingStatus();

  useEffect(() => {
    if (!fontsLoaded || hasOnboarded === null) return;

    console.log(`[${timestamp()}] [RootLayout] Fonts Loaded:`, fontsLoaded);
    console.log(`[${timestamp()}] [RootLayout] hasOnboarded:`, hasOnboarded);

    if (!hasOnboarded) {
      console.log(`[${timestamp()}] [RootLayout] Navigating to '/onboarding'`);
      router.replace("/onboarding");
    }
  }, [fontsLoaded, hasOnboarded]);

  if (!fontsLoaded || hasOnboarded === null) {
    console.log(`[${timestamp()}] [RootLayout] Waiting for initialization...`);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Make (tabs) the default route */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
