// client/hatchlink/app/(drawer)/(tabs)/feed.tsx
import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme"; // Import the hook
import { Colors } from "@/constants/Colors"; // Import the Colors object

export default function FeedScreen() {
  const colorScheme = useColorScheme(); // Get the current color scheme
  const currentColors = Colors[colorScheme ?? "light"]; // Select the appropriate colors

  return (
    <View
      style={[styles.container, { backgroundColor: currentColors.background }]}
    >
      <Text style={[styles.title, { color: currentColors.text }]}>Feed</Text>
      <Text style={[styles.description, { color: currentColors.text }]}>
        This is the Hatchlink{" "}
        <Text style={[styles.bold, { color: currentColors.tint }]}>Feed.</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
});
