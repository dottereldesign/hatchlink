import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="feed" options={{ title: "Feed" }} />
      <Tabs.Screen name="notices" options={{ title: "Notices" }} />
      <Tabs.Screen name="switch" options={{ title: "Switch" }} />
    </Tabs>
  );
}
