import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>HatchLink</Text>
        <Image
          source={require("../assets/images/hatchlink-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      {/* Add Link to Home Screen */}
      <Link href="/(tabs)/home" style={styles.link}>
        Go to Home Screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    fontFamily: "PoppinsBold", // Apply Poppins font
    fontSize: 24,
    fontWeight: "bold",
  },
  logo: {
    width: 50,
    height: 50,
  },
  link: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "500",
    color: "#007BFF",
    textDecorationLine: "underline",
  },
});
