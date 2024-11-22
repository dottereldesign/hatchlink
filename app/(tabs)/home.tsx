import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          // Initialize iconName with a default value
          let iconName: keyof typeof Ionicons.glyphMap = "help-outline";

          if (route.name === "home") iconName = "home-outline";
          else if (route.name === "feed") iconName = "list-outline";
          else if (route.name === "notices") iconName = "notifications-outline";
          else if (route.name === "switch")
            iconName = "swap-horizontal-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    />
  );
}
