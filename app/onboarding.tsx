import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { debugAsyncStorage } from "@/utils/asyncStorageUtil";

// Helper for timestamped logs
const logTimestamp = () => new Date().toISOString();

export default function Onboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1); // Tracks the current onboarding step
  const [selectedLanguage, setSelectedLanguage] = useState<string>(""); // Tracks selected language
  const [notifications, setNotifications] = useState({
    newsletters: false,
    events: false,
    groupAlerts: false,
    publications: false,
    articles: false,
    notices: false,
    appUpdates: false,
  });

  // Completes the onboarding process and navigates to the main app
  const completeOnboarding = async () => {
    try {
      console.log(
        `[${logTimestamp()}] [Onboarding] Setting 'hasOnboarded' to true`
      );
      await debugAsyncStorage.setItem("hasOnboarded", "true");
      console.log(`[${logTimestamp()}] [Onboarding] Successfully onboarded`);
      router.replace("/"); // Redirect to main screen
    } catch (error) {
      console.error(
        `[${logTimestamp()}] [Onboarding] Error during onboarding:`,
        error
      );
    }
  };

  // Advances to the next onboarding step
  const goToNextStep = () => {
    console.log(
      `[${logTimestamp()}] [Onboarding] Moving to step ${currentStep + 1}`
    );
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Returns to the previous onboarding step
  const goToPreviousStep = () => {
    console.log(
      `[${logTimestamp()}] [Onboarding] Returning to step ${currentStep - 1}`
    );
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  // Toggles notification state for each switch
  const toggleNotification = (type: keyof typeof notifications) => {
    setNotifications((prevState) => ({
      ...prevState,
      [type]: !prevState[type], // Toggle the boolean value for the specified notification
    }));
  };

  // Determines the content to render for each step
  const renderStepContent = () => {
    console.log(
      `[${logTimestamp()}] [Onboarding] Rendering content for Step ${currentStep}`
    );
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.languageSelectionContainer}>
            <Text style={styles.stepHeading}>Language</Text>
            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(value: string) => setSelectedLanguage(value)}
                style={styles.dropdownPicker}
              >
                <Picker.Item label="Select a language" value="" />
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Te Reo" value="te" />
                <Picker.Item label="Spanish" value="es" />
                <Picker.Item label="French" value="fr" />
                <Picker.Item label="German" value="de" />
              </Picker>
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.notificationsContainer}>
            <Text style={styles.stepHeading}>Notifications</Text>
            {Object.keys(notifications).map((type, index) => {
              const notificationKey = type as keyof typeof notifications;

              return (
                <View key={type} style={styles.notificationContainer}>
                  {/* Row with label and switch */}
                  <View style={styles.notificationItem}>
                    <Text style={styles.notificationLabel}>
                      {notificationKey.charAt(0).toUpperCase() +
                        notificationKey.slice(1).replace(/([A-Z])/g, " $1")}
                    </Text>
                    <Switch
                      value={notifications[notificationKey]}
                      onValueChange={() => toggleNotification(notificationKey)}
                      thumbColor={
                        notifications[notificationKey] ? "#fff" : "#fff"
                      }
                      trackColor={{
                        true: "green",
                        false: "red",
                      }}
                    />
                  </View>

                  {/* Separator */}
                  {index < Object.keys(notifications).length - 1 && (
                    <View style={styles.separator} />
                  )}
                </View>
              );
            })}
          </View>
        );
      case 3:
        return (
          <View style={styles.subscribeContainer}>
            <Text style={styles.stepHeading}>Subscribe</Text>

            {/* Dropdown Picker */}
            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={selectedLanguage} // You can replace this state with a specific subscription state if needed
                onValueChange={(value: string) => setSelectedLanguage(value)}
                style={styles.dropdownPicker}
              >
                <Picker.Item label="Select from the dropdown" value="" />
                <Picker.Item label="Merrin School" value="merrin" />
                <Picker.Item
                  label="New Brighton Seaside Market"
                  value="new-brighton"
                />
                <Picker.Item
                  label="Grace Vineyard Church"
                  value="grace-vineyard"
                />
                <Picker.Item
                  label="Christchurch Boys High"
                  value="christchurch-boys"
                />
              </Picker>
            </View>

            {/* Info Messages */}
            <Text style={styles.redText}>
              You need at least 1 subscription to continue
            </Text>
            <Text style={styles.greyText}>
              Unsure? No worries, you can add or remove subscriptions at any
              time in the settings.
            </Text>
          </View>
        );

      case 4:
        return <Text style={styles.stepHeading}>Step 4: Subscribe</Text>;
      default:
        return null;
    }
  };

  // Determines the text for the primary button based on the current step
  const getPrimaryButtonText = () => {
    switch (currentStep) {
      case 1:
        return "Next";
      case 2:
        return "Enable Notifications";
      case 3:
        return "Subscribe";
      case 4:
        return "Subscribe";
      default:
        return "Next";
    }
  };

  // Handles the action for the primary button
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
  notificationsContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    maxWidth: 360,
    width: "100%",
  },
  languageSelectionContainer: {
    alignItems: "center",
    width: "100%",
    maxWidth: 360,
  },
  stepHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    alignSelf: "center",
  },
  dropdownContainer: {
    height: 54,
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC7C7",
    justifyContent: "center",
    backgroundColor: "#fff",
    maxWidth: 350,
  },
  dropdownPicker: {
    height: 54,
    maxWidth: 360,
    width: "100%",
    borderRadius: 8,
    borderColor: "white",
    borderWidth: StyleSheet.hairlineWidth,
    fontSize: 16,
    padding: 4,
  },
  notificationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    width: "100%",
  },
  notificationLabel: {
    fontSize: 16,
    fontWeight: "400",
  },
  notificationContainer: {
    width: "100%", // Ensures the notification container spans the full width
    maxWidth: 360, // Matches the max width of the overall container
    marginBottom: 0, // Adds spacing between notification items
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#CCC",
    width: "100%",
    marginTop: 0,
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

  subscribeContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    maxWidth: 360,
    width: "100%",
    paddingVertical: 16,
  },
  redText: {
    color: "red",
    fontSize: 14,
    fontWeight: "300", // Lightweight text
    marginTop: 12,
    textAlign: "center",
  },
  greyText: {
    color: "#6B6B6B",
    fontSize: 14,
    fontWeight: "400",
    marginTop: 8,
    textAlign: "center",
  },
});
