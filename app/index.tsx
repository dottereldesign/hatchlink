import React from "react";
import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  console.log("[Index] Rendering Index Screen");

  const clearAsyncStorage = async () => {
    try {
      console.log("[Index] Clearing AsyncStorage...");
      await AsyncStorage.clear();
      console.log("[Index] AsyncStorage cleared successfully!");
      Alert.alert("Success", "AsyncStorage has been cleared!");
    } catch (error) {
      console.error("[Index] Failed to clear AsyncStorage:", error);
      Alert.alert(
        "Error",
        "Failed to clear AsyncStorage. Check logs for details."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Index</Text>
      <Image
        source={require("../assets/images/hatchlink-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      {/* Debug button for clearing AsyncStorage */}
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
