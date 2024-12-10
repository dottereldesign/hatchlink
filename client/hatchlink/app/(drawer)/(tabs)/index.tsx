// client/hatchlink/app/(drawer)/(tabs)/index.tsx
import { StyleSheet, View, Text } from "react-native";
import React from "react";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.description}>
        This is the Hatchlink <Text style={styles.bold}>Home.</Text>
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
    color: "#fff",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
  bold: {
    fontWeight: "bold",
  },
});
