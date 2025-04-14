import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Cutie from "../../assets/Cutie.svg"

export default function OnboardingScreen() {
  const router = useRouter();

  const handleCompleteOnboarding = async () => {
    await AsyncStorage.setItem("onboardingComplete", "true");
    router.replace("/profile");
  }

  return (
    <View className="flex-1 bg-primary relative justify-between items-center">
      <View>
        <Text className="text-5xl font-semibold text-black z-20 mt-56">
          HI BUDDY!
        </Text>
      </View>

      <View className="absolute bottom-12 w-full items-center z-30">
        <TouchableOpacity
          className="bg-buttonBg px-40 py-4 rounded-2xl mb-4"
          onPress={() => router.push("/signup")}
        >
          <Text className="text-lg text-white font-semibold">Let’s Start!</Text>
        </TouchableOpacity>
        <Text className="text-base text-black">
          Already using Signie? <Text className="font-bold">Log in</Text>
        </Text>
      </View>
      <Cutie width={600} height={600}/>
    </View>
  );
}
