// app/onboarding.tsx
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { debugAsyncStorage } from "@/utils/asyncStorageUtil";

export default function Onboarding() {
  const router = useRouter();

  const handleNext = async () => {
    try {
      console.group("Onboarding Debugging");
      console.log("Saving onboarding status...");
      await debugAsyncStorage.setItem("hasOnboarded", "true");
      console.log("Onboarding status saved. Redirecting to index...");
      router.replace("/");
      console.groupEnd();
    } catch (error) {
      console.error("Error saving onboarding status:", error);
    }
  };

  console.log("Rendering Onboarding screen...");

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/hatchlink-logo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to HatchLink</Text>
      <Text style={styles.description}>
        Discover a world of local communities. From schools to sports clubs,
        HatchLink keeps you informed and connected.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
