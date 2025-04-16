import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "./globals.css";

export default function RootLayout() {
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(
    null
  );

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
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="preference" />
            <Stack.Screen name="splash" />
            <Stack.Screen name="level" />
            <Stack.Screen name="camera" />
          </Stack>
        </PaperProvider>
    </SafeAreaProvider>
  );
}
