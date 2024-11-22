import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

type IconSymbolProps = {
  style?: TextStyle; // Use TextStyle for styles that apply to Text components
  name: string; // Example prop, adjust as needed
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
