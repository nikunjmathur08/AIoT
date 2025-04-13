import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import Loading from "./loading";

export default function Index() {
  const [loading, setLoading] = useState(true);
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
