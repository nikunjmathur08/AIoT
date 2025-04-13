import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Loading from "./loading";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await AsyncStorage.getItem("onboardingComplete");
      console.log("Onboarding complete:", value);
      if (value === "true") {
        router.replace("/(tabs)/profile");
      } else {
        router.replace("/(auth)/onboarding");
      }
    };

    checkOnboarding();
  }, []);

  return (
    <Loading/>
  );
}
