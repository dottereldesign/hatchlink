// client/hatchlink/app/(drawer)/_layout.tsx
import React from "react";
import { StyleSheet, ViewStyle, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { DrawerNavigationProp } from "@react-navigation/drawer"; // Import DrawerNavigationProp
import { useNavigation } from "@react-navigation/native";

export default function DrawerLayout() {
  console.log("[Drawer Layout] Rendering Drawer Layout");

  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <Drawer
        screenOptions={{
          drawerStyle: styles.drawerStyle,
          drawerType: "front",
        }}
      >
        {/* Home - Connected to "index.tsx" in (tabs) */}
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            title: "Home",
            headerShown: true,
            headerLeft: () => <CustomMenuButton size={32} />, // Increase the size to 40
            drawerItemStyle: styles.drawerItem,
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="home" size={24} color={color} />
            ),
          }}
        />

        {/* Settings */}
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            title: "Settings",
            headerShown: true,
            headerLeft: () => <CustomMenuButton size={32} />, // Increase the size to 40
            drawerItemStyle: styles.drawerItem,
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="cog" size={24} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const CustomMenuButton = ({ size }: { size: number }) => {
  // Explicitly type the navigation object as DrawerNavigationProp
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <TouchableOpacity
      style={styles.menuButtonContainer}
      onPress={() => navigation.openDrawer()} // Open the drawer
    >
      <FontAwesome5 name="bars" size={size} color="#FFF" /> {/* Menu icon */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  } as ViewStyle,
  drawerStyle: {
    width: 240,
  } as ViewStyle,
  drawerItem: {
    borderRadius: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#3d444d",
    marginVertical: 4,
  } as ViewStyle,
  menuButtonContainer: {
    marginLeft: 16, // Adjust margin as needed
  } as ViewStyle,
});
