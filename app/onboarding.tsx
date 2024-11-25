import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { debugAsyncStorage } from "@/utils/asyncStorageUtil";

// Helper for timestamped logs
const timestamp = () => new Date().toISOString();

export default function Onboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1); // Track the current step

  const completeOnboarding = async () => {
    try {
      console.log(
        `[${timestamp()}] [Onboarding] Setting 'hasOnboarded' to true`
      );
      await debugAsyncStorage.setItem("hasOnboarded", "true");
      console.log(`[${timestamp()}] [Onboarding] Successfully onboarded`);
      router.replace("/"); // Redirect to index
    } catch (error) {
      console.error(
        `[${timestamp()}] [Onboarding] Error during onboarding:`,
        error
      );
    }
  };

  const handleNextStep = () => {
    console.log(
      `[${timestamp()}] [Onboarding] Moving to step ${currentStep + 1}`
    );
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Render content based on the current step
  const renderStepContent = () => {
    console.log(
      `[${timestamp()}] [Onboarding] Rendering content for Step ${currentStep}`
    );
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.text}>Step 1: Welcome</Text>
            <Button title="Next" onPress={handleNextStep} />
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.text}>Step 2: Enable Notifications</Text>
            <Button title="Enable Notifications" onPress={handleNextStep} />
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.text}>Step 3: Subscribe</Text>
            <Button title="Subscribe" onPress={handleNextStep} />
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.text}>Step 4: Subscribe</Text>
            <Button title="Subscribe" onPress={completeOnboarding} />
          </View>
        );
      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderStepContent()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  stepContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
