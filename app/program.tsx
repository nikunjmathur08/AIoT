import React from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Cutie from "../assets/Cutie2.svg"

export default function ProgramReady() {
  const router = useRouter();

  const handleContinue = async (playGame: boolean) => {
    try {
      await AsyncStorage.setItem("onboardingCompleted", "true");
      if (playGame) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/(tabs)/home");
      }
    } catch (e) {
      console.error("Error setting onboarding flag:", e);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary justify-between items-center pt-32 pb-12">
      <Cutie width={200} height={200}/>

      <Text className="text-xl font-bold text-black text-center -mt-56">
        Your program is ready
      </Text>

      <View className="w-full px-6">
        <TouchableOpacity
          className="bg-buttonBg py-4 rounded-xl items-center mb-4"
          onPress={() => handleContinue(true)}
        >
          <Text className="text-white text-lg font-semibold">Play a game</Text>
        </TouchableOpacity>

        <Pressable onPress={() => handleContinue(false)}>
          <Text className="text-center text-md text-gray-500">Skip game</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
