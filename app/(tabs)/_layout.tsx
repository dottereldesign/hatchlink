import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#fff", // Background color
          height: 70, // Adjust height for icons and text
          borderTopWidth: 1, // Remove top border
          borderColor: "#808080",
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12, // Label font size
          fontFamily: "PoppinsMedium", // Custom font for label
        },
        tabBarActiveTintColor: "#000", // Active tab text/icon color
        tabBarInactiveTintColor: "#808080", // Inactive tab text/icon color
        tabBarIconStyle: {
          marginBottom: 0, // Adjust spacing between icon and text
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "help-outline";

          if (route.name === "home") iconName = "home-outline";
          else if (route.name === "feed") iconName = "reader-outline";
          else if (route.name === "notices") iconName = "megaphone-outline";
          else if (route.name === "switch")
            iconName = "swap-horizontal-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: route.name.charAt(0).toUpperCase() + route.name.slice(1), // Dynamically use route name as label
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="feed" options={{ title: "Feed" }} />
      <Tabs.Screen name="notices" options={{ title: "Notices" }} />
      <Tabs.Screen name="switch" options={{ title: "Switch" }} />
    </Tabs>
  );
}
