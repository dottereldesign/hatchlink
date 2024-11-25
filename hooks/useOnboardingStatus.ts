import { useState, useEffect } from "react";
import { debugAsyncStorage } from "@/utils/asyncStorageUtil";

// Helper for timestamped logs
const timestamp = () => new Date().toISOString();

export const useOnboardingStatus = () => {
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    console.log(
      `[${timestamp()}] [useOnboardingStatus] Checking onboarding status`
    );
    const fetchOnboardingStatus = async () => {
      try {
        const onboarded = await debugAsyncStorage.getItem("hasOnboarded");
        console.log(
          `[${timestamp()}] [useOnboardingStatus] 'hasOnboarded' =`,
          onboarded
        );
        setHasOnboarded(onboarded === "true");
      } catch (error) {
        console.error(
          `[${timestamp()}] [useOnboardingStatus] Error fetching status:`,
          error
        );
        setHasOnboarded(false); // Fallback
      }
    };

    fetchOnboardingStatus();
  }, []);

  return hasOnboarded;
};
