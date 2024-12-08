// client/hatchlink/app/(drawer)/_layout.tsx
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useRouter } from "expo-router";

export default function DrawerLayout() {
  console.log("Rendering Drawer Layout");

  const router = useRouter(); // Initialize router

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="(tabs)" // Points to the (tabs) folder
          options={{
            drawerLabel: "Home", // Label for the drawer menu
            headerShown: true, // Show header
          }}
          listeners={{
            focus: () => console.log("Drawer: Focused on Home (tabs)"),
            blur: () => console.log("Drawer: Lost focus on Home (tabs)"),
            drawerItemPress: (e) => {
              e.preventDefault(); // Stop default drawer navigation
              console.log("Drawer: Home button clicked");
              console.log("Drawer Event:", e);
              router.push("/"); // Navigate to the default route (index.tsx in (tabs))
            },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
