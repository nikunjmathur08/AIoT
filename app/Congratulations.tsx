import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Cutie from "../assets/Cutie2.svg"

export default function CongratulationsScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-[#F6FBF7] justify-between">
      <View className="flex-1 items-center justify-center">
        <View className="mt-12 mb-8">
          <View className="w-48 h-48 rounded-full bg-[#F97E7E] border-8 border-[#E6ECE8] items-center justify-center">
            {/* Replace with SVG or Image if available */}
            <Cutie width={200} height={200} className="mb-24"/>
          </View>
        </View>
        <Text className="text-2xl font-bold text-center text-black mb-8">Congratulations!</Text>
        <View className="flex-row justify-center space-x-4 mb-8">
          <View className="bg-[#E6ECE8] rounded-xl px-6 py-4 items-center mx-1 min-w-[90px]">
            <Text className="text-xs text-gray-500 mb-1">Total XP</Text>
            <View className="flex-row items-center">
              <Text className="text-lg font-bold text-[#F7B801] mr-1">⚡</Text>
              <Text className="text-lg font-bold text-black">15</Text>
            </View>
          </View>
          <View className="bg-[#E6ECE8] rounded-xl px-6 py-4 items-center mx-1 min-w-[90px]">
            <Text className="text-xs text-gray-500 mb-1">Accuracy</Text>
            <View className="flex-row items-center">
              <Text className="text-lg font-bold text-[#F97E7E] mr-1">🎯</Text>
              <Text className="text-lg font-bold text-black">100%</Text>
            </View>
          </View>
          <View className="bg-[#E6ECE8] rounded-xl px-6 py-4 items-center mx-1 min-w-[90px]">
            <Text className="text-xs text-gray-500 mb-1">Speed</Text>
            <Text className="text-lg font-bold text-black">1:10</Text>
          </View>
        </View>
      </View>
      <View className="px-6 pb-8">
        <TouchableOpacity
          className="bg-[#3D3D3D] py-4 rounded-xl items-center"
          onPress={() => {
            setTimeout(() => {
              router.replace('/DayStreak');
            }, 400);
          }}
        >
          <Text className="text-white text-lg font-semibold">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}