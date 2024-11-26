import React from "react";
import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  console.log("[Home] Rendering Home Screen");

  const clearAsyncStorage = async () => {
    try {
      console.log("[Home] Clearing AsyncStorage...");
      await AsyncStorage.clear();
      console.log("[Home] AsyncStorage cleared successfully!");
      Alert.alert("Success", "AsyncStorage has been cleared!");
    } catch (error) {
      console.error("[Home] Failed to clear AsyncStorage:", error);
      Alert.alert(
        "Error",
        "Failed to clear AsyncStorage. Check logs for details."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Image
        source={require("../../assets/images/hatchlink-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.buttonContainer}>
        <Button title="Clear AsyncStorage" onPress={clearAsyncStorage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: "80%",
  },
});
