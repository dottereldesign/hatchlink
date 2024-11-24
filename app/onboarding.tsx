// app/onboarding.tsx
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { debugAsyncStorage } from "@/utils/asyncStorageUtil";

export default function Onboarding() {
  const router = useRouter();

  const completeOnboarding = async () => {
    try {
      console.log(
        "[Onboarding] Setting 'hasOnboarded' to true in AsyncStorage"
      );
      await debugAsyncStorage.setItem("hasOnboarded", "true");
      console.log("[Onboarding] Successfully updated AsyncStorage");
      console.log("[Onboarding] Navigating to '/'");
      router.replace("/");
    } catch (error) {
      console.error("[Onboarding] Error during onboarding completion:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Onboarding</Text>
      <Button
        title="Complete Onboarding"
        onPress={() => {
          console.log("[Onboarding] Complete Onboarding button pressed");
          completeOnboarding();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
