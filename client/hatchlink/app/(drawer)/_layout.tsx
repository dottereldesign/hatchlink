// client/hatchlink/app/(drawer)/_layout.tsx
import React from "react";
import { StyleSheet, ViewStyle, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation, useRoute } from "@react-navigation/native";

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
        {/* Home - Connects to the "index.tsx" in (tabs) */}
        <Drawer.Screen
          name="(tabs)" // Use the folder name for default route
          options={{
            drawerLabel: "Home",
            title: "",
            headerShown: true,
            headerLeft: () => <CustomMenuButton size={32} />,
            drawerItemStyle: styles.drawerItem,
            drawerIcon: ({ color }) => (
              <FontAwesome5 name="home" size={24} color={color} />
            ),
          }}
        />

        {/* Settings */}
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            title: "",
            headerShown: true,
            headerLeft: () => <CustomBackButton size={24} />, // Back button for settings
            drawerItemStyle: styles.drawerItem,
            drawerIcon: ({ color }) => (
              <FontAwesome5 name="cog" size={24} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const CustomMenuButton = ({ size }: { size: number }) => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <TouchableOpacity
      style={styles.menuButtonContainer}
      onPress={() => navigation.openDrawer()}
    >
      <FontAwesome5 name="bars" size={size} color="#FFF" />
    </TouchableOpacity>
  );
};

const CustomBackButton = ({ size }: { size: number }) => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <TouchableOpacity
      style={styles.menuButtonContainer}
      onPress={() => navigation.goBack()}
    >
      <FontAwesome5 name="arrow-left" size={size} color="#FFF" />
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
    marginLeft: 16,
  } as ViewStyle,
});
