// jest.setup.ts
import React from "react";
import "@testing-library/jest-native/extend-expect";
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);
console.log("Jest setup file loaded!");

// Mock Expo Font
jest.mock("expo-font", () => ({
  useFonts: () => [true], // Mock fonts as always loaded
}));

// Mock React Native Reanimated
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");

  // Overriding the `call` method to do nothing
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Mock Appearance for useColorScheme
jest.mock("react-native/Libraries/Utilities/Appearance", () => ({
  getColorScheme: jest.fn(() => "light"), // Mock as 'light' or 'dark'
  addChangeListener: jest.fn(),
  removeChangeListener: jest.fn(),
}));

jest.mock("react-native-gesture-handler", () => ({
  GestureHandlerRootView: jest.fn(({ children }) => children),
  Swipeable: jest.fn(() => null),
  DrawerLayout: jest.fn(() => null),
  State: {},
  PanGestureHandler: jest.fn(() => null),
  TapGestureHandler: jest.fn(() => null),
  RotationGestureHandler: jest.fn(() => null),
  FlingGestureHandler: jest.fn(() => null),
  LongPressGestureHandler: jest.fn(() => null),
  ForceTouchGestureHandler: jest.fn(() => null),
  GestureDetector: jest.fn(({ children }) => children),
  GestureObjects: {},
  Gesture: {
    create: jest.fn(),
  },
}));
