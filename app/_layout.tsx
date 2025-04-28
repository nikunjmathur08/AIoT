import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { ModelProvider } from "./ModelContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as tf from "@tensorflow/tfjs";
import "./globals.css";

export default function RootLayout() {
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(
    null
  );

  // ✅ Always call hooks at the top level
  useEffect(() => {
    const prepareTfjs = async () => {
      try {
        await tf.ready();
        await tf.setBackend("rn-webgl");
        console.log("TensorFlow.js preloaded!");
      } catch (error) {
        console.error("TensorFlow.js preload failed:", error);
      }
    };
    prepareTfjs();
  }, []);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const value = await AsyncStorage.getItem("onboardingComplete");
      setOnboardingComplete(value === "true");
    };
    checkOnboardingStatus();
  }, []);

  if (onboardingComplete === null) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <ModelProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="components/QuestionScreen" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="preference" />
            <Stack.Screen name="camera" />
            <Stack.Screen name="splash" />
            <Stack.Screen name="level" />
            <Stack.Screen name="levelScreen" />
          </Stack>
        </ModelProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
