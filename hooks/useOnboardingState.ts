import { useState } from "react";
import { useRouter } from "expo-router";
import { debugAsyncStorage } from "@/utils/asyncStorageUtil";

export const useOnboardingState = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [notifications, setNotifications] = useState({
    newsletters: false,
    events: false,
    groupAlerts: false,
    publications: false,
    articles: false,
    notices: false,
    appUpdates: false,
  });

  console.log("[useOnboardingState] Initializing state");

  const toggleNotification = (type: keyof typeof notifications) => {
    console.log(`[useOnboardingState] Toggling notification: ${type}`);
    setNotifications((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  const goToNextStep = () => {
    console.log("[useOnboardingState] Moving to next step");
    setCurrentStep((prev) => prev + 1);
  };

  const goToPreviousStep = () => {
    console.log("[useOnboardingState] Moving to previous step");
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const completeOnboarding = async () => {
    console.log("[useOnboardingState] Completing onboarding");
    try {
      await debugAsyncStorage.setItem("hasOnboarded", "true");
      router.replace("/");
    } catch (error) {
      console.error("[useOnboardingState] Error completing onboarding:", error);
    }
  };

  return {
    currentStep,
    selectedLanguage,
    notifications,
    setSelectedLanguage,
    toggleNotification,
    goToNextStep,
    goToPreviousStep,
    completeOnboarding,
  };
};
