import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useOnboardingState } from "@/hooks/useOnboardingState";
import { LanguageSelection } from "src/features/LanguageSelection";
import { NotificationsSetup } from "src/features/NotificationsSetup";
import { SubscribeSetup } from "src/features/SubscribeSetup";

export default function Onboarding() {
  const {
    currentStep,
    selectedLanguage,
    notifications,
    setSelectedLanguage,
    toggleNotification,
    goToNextStep,
    goToPreviousStep,
    completeOnboarding,
  } = useOnboardingState();

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <LanguageSelection
            selectedLanguage={selectedLanguage}
            onSelectLanguage={setSelectedLanguage}
          />
        );
      case 2:
        return (
          <NotificationsSetup
            notifications={notifications}
            onToggleNotification={toggleNotification}
          />
        );
      case 3:
        return (
          <SubscribeSetup
            selectedSubscription={selectedLanguage} // Repurposing language as subscription for now
            onSelectSubscription={setSelectedLanguage}
          />
        );
      case 4:
        return <Text style={styles.stepHeading}>Final Step: Confirm</Text>;
      default:
        return null;
    }
  };

  const getPrimaryButtonText = () => {
    if (currentStep < 4) return "Next";
    return "Finish";
  };

  const handlePrimaryButtonPress = () => {
    if (currentStep < 4) {
      goToNextStep();
    } else {
      completeOnboarding();
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.contentContainer}>{renderStepContent()}</View>

      {/* Back Button */}
      {currentStep > 1 && (
        <TouchableOpacity style={styles.backButton} onPress={goToPreviousStep}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      )}

      {/* Primary Button */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handlePrimaryButtonPress}
      >
        <Text style={styles.primaryButtonText}>{getPrimaryButtonText()}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    maxWidth: 360,
    width: "100%",
  },
  stepHeading: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  primaryButton: {
    height: 54,
    maxWidth: 360,
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    justifyContent: "center",
    alignItems: "flex-start",
    alignSelf: "center",
    maxWidth: 360,
    width: "100%",
  },
  backButtonText: {
    color: "#007BFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
