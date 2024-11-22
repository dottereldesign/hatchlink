import React, { useEffect, useState } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";
import { debugAsyncStorage } from "@/utils/asyncStorageUtil";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
  });

  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);

  // Debugging for initialization
  console.group("Initialization Debugging");
  console.log("Fonts loaded:", fontsLoaded);
  console.log("Current hasOnboarded state:", hasOnboarded);
  console.groupEnd();

  // Check onboarding status
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        console.group("Onboarding Status Check");
        console.log("Fetching onboarding status...");
        const onboarded = await debugAsyncStorage.getItem("hasOnboarded");
        console.log("Fetched value from AsyncStorage:", onboarded);
        setHasOnboarded(onboarded === "true");
        console.log("Updated hasOnboarded state:", onboarded === "true");
        console.groupEnd();
      } catch (error) {
        console.error("Error accessing AsyncStorage:", error);
      }
    };
    checkOnboardingStatus();
  }, []);

  // Log available routes
  useEffect(() => {
    console.group("Route Resolution Debugging");
    console.log("Resolving routes...");
    console.log("Available routes:", [
      { path: "/", screen: "index" },
      { path: "/onboarding", screen: "onboarding" },
      { path: "/(tabs)/home", screen: "(tabs)" },
    ]);
    console.groupEnd();
  }, []);

  // Redirect to onboarding if needed
  useEffect(() => {
    console.group("Onboarding Redirect Logic Debugging");
    console.log("Current onboarding state:", hasOnboarded);
    if (hasOnboarded === false) {
      console.log("User has not onboarded. Redirecting to /onboarding...");
      router.replace("/onboarding");
    } else if (hasOnboarded === true) {
      console.log("User has already onboarded. Proceeding to the main app.");
    }
    console.groupEnd();
  }, [hasOnboarded]);

  // Show loading screen while fonts or onboarding state are unresolved
  if (!fontsLoaded || hasOnboarded === null) {
    console.group("App Loading Debugging");
    console.log("Waiting for fonts to load or onboarding state to resolve...");
    console.groupEnd();
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  console.log("Rendering RootLayout...");

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
