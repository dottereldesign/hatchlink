// client/hatchlink/__tests__/Navigation/TabsLayout.test.tsx
import React from "react";
import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import FeedScreen from "../../app/(drawer)/(tabs)/feed";

test("renders FeedScreen", () => {
  const { getByText } = render(
    <NavigationContainer>
      <FeedScreen />
    </NavigationContainer>
  );

  expect(getByText("Feed")).toBeTruthy();
});
