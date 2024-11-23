import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

type IconSymbolProps = {
  name: string;
  size?: number; // Add this if missing
  weight: string;
  color: string;
  style?: TextStyle; // If style is being passed
};

export default function IconSymbol({ style, name }: IconSymbolProps) {
  return <Text style={[styles.icon, style]}>{name}</Text>;
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 24, // Example style
    fontWeight: "bold",
  },
});
