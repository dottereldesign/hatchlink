// client/hatchlink/app/(drawer)/(tabs)/index.tsx
import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const currentColors = Colors[colorScheme ?? "light"];

  return (
    <View
      style={[styles.container, { backgroundColor: currentColors.background }]}
    >
      <Text style={[styles.title, { color: currentColors.text }]}>Home</Text>
      <Text style={[styles.description, { color: currentColors.text }]}>
        This is the Hatchlink{" "}
        <Text style={[styles.bold, { color: currentColors.tint }]}>Home.</Text>
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
