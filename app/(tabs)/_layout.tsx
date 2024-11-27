// app/(tabs)/_layout.tsx
import React, { Suspense } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, ActivityIndicator, Text } from "react-native";

// Define types for ErrorBoundary props and state
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Error Boundary Component
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error("Error in Tabs:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "red", fontSize: 16 }}>
            Something went wrong!
          </Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function TabsLayout() {
  return (
    <Suspense
      fallback={
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#000" />
        </View>
      }
    >
      <ErrorBoundary>
        <Tabs
          screenOptions={({ route }) => ({
            tabBarStyle: {
              backgroundColor: "#fff",
              height: 70,
              borderTopWidth: 1,
              borderColor: "#808080",
              paddingBottom: 5,
              paddingTop: 5,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: "PoppinsMedium",
            },
            tabBarActiveTintColor: "#000",
            tabBarInactiveTintColor: "#808080",
            tabBarIcon: ({ color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap = "help-outline";

              if (route.name === "home") iconName = "home-outline";
              else if (route.name === "feed") iconName = "reader-outline";
              else if (route.name === "notices") iconName = "megaphone-outline";
              else if (route.name === "switch")
                iconName = "swap-horizontal-outline";

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tabs.Screen name="home" options={{ title: "Home" }} />
          <Tabs.Screen name="feed" options={{ title: "Feed" }} />
          <Tabs.Screen name="notices" options={{ title: "Notices" }} />
          <Tabs.Screen name="switch" options={{ title: "Switch" }} />
        </Tabs>
      </ErrorBoundary>
    </Suspense>
  );
}
