// client/hatchlink/app/(drawer)/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import HomeIcon from "@/assets/icons/HomeIcon";
import FeedIcon from "@/assets/icons/FeedIcon";
import Octicons from "@expo/vector-icons/Octicons";

export default function TabsLayout() {
  console.log("[Tabs Layout] Rendering Tabs Layout");

  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].text,
        headerShown: false, // Ensures no headers in the tabs
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarLabelStyle: {
          fontSize: 12, // Adjust the font size
          fontWeight: "bold", // Optionally make it bold
        },
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute", // Keep iOS style intact
            height: 60, // Increase the height of the tab bar
            paddingBottom: 10, // Add padding inside the tab bar
          },
          android: {
            height: 60, // Increase the height for Android
            paddingBottom: 10,
          },
          default: {
            height: 70, // Fallback for other platforms
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <HomeIcon width={32} height={32} stroke={color} />
          ),
        }}
        listeners={{
          focus: () => console.log("[Tabs Layout] Focused on Home Tab (index)"),
          blur: () =>
            console.log("[Tabs Layout] Lost focus on Home Tab (index)"),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",
          tabBarIcon: ({ color }) => (
            <FeedIcon width={24} height={24} stroke={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notices"
        options={{
          title: "Notices",
          tabBarIcon: ({ color }) => (
            <Octicons name="megaphone" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="switch"
        options={{
          title: "Switch",
          tabBarIcon: ({ color }) => (
            <Octicons name="arrow-switch" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
