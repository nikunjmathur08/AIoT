import React from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import A from "../assets/alphabets/A.svg";

export default function ProgramReady() {
  const router = useRouter();

  const handleContinue = async (playGame: boolean) => {
    try {
      await AsyncStorage.setItem("onboardingCompleted", "true");
      if (playGame) {
        router.replace("/levelScreen");
      } else {
        router.replace("/(tabs)/home");
      }
    } catch (e) {
      console.error("Error setting onboarding flag:", e);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary justify-between items-center pt-32 pb-12">
      <View className="items-center justify-center flex-1 w-full px-6 -mt-32">
        <Text className="text-2xl font-bold text-black text-center mb-6 mt-2">
          Here's how to make the 'A' sign
        </Text>
        <View className="bg-white rounded-2xl shadow-lg p-6 items-center w-full max-w-[320px]">
          <A className="w-40 h-40" />
          <Text className="text-base text-gray-700 text-center mb-2">
            This is the American Sign Language (ASL) sign for the letter 'A'.
          </Text>
        </View>
        <View className="mt-10 mb-2">
          <Image
            source={require('../assets/bouncy.gif')}
            className="w-64 h-64"
            resizeMode="contain"
          />
        </View>
      </View>

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
