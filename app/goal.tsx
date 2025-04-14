import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Goal() {
  const [goal, setGoal] = useState("5");
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 bg-primary px-6 pt-8">
        {/* Progress bar */}
        <View className="flex-row justify-between items-center mb-6">
          <Pressable onPress={() => router.back()}>
            <Text className="text-2xl">←</Text>
          </Pressable>
          <View className="flex-1 mx-4 h-2 rounded-full bg-grey">
            <View className="h-full w-3/3 bg-secondary rounded-full" />
          </View>
          <Text className="text-lg font-medium">3/3</Text>
        </View>

        {/* Daily Goal */}
        <Text className="text-2xl font-bold my-8">What is your daily learning goal?</Text>
        {/* Non-Existent */}
        <TouchableOpacity
          className={`rounded-2xl px-4 py-4 mb-4 flex-row items-center ${
            goal === "5" ? "bg-secondary" : "bg-white"
          }`}
          onPress={() => setGoal("5")}
        >
          <Text
            className={`text-lg font-medium ${
              goal === "5" ? "text-white" : "text-black"
            }`}
          >
            5 mins daily
          </Text>
          {/* I know some words and phrases */}
        </TouchableOpacity>
        <TouchableOpacity
          className={`rounded-2xl px-4 py-4 mb-4 flex-row items-center ${
            goal === "10" ? "bg-secondary" : "bg-white"
          }`}
          onPress={() => setGoal("10")}
        >
          <Text
            className={`text-lg font-medium ${
              goal === "10" ? "text-white" : "text-black"
            }`}
          >
            10 mins daily
          </Text>
        </TouchableOpacity>
        {/* I know a good amount */}
        <TouchableOpacity
          className={`rounded-2xl px-4 py-4 mb-4 flex-row items-center ${
            goal === "15" ? "bg-secondary" : "bg-white"
          }`}
          onPress={() => setGoal("15")}
        >
          <Text
            className={`text-lg font-medium ${
              goal === "15" ? "text-white" : "text-black"
            }`}
          >
            15 mins daily
          </Text>
        </TouchableOpacity>
        {/* I can fully express myself */}
        <TouchableOpacity
          className={`rounded-2xl px-4 py-4 mb-4 flex-row items-center ${
            goal === "15+" ? "bg-secondary" : "bg-white"
          }`}
          onPress={() => setGoal("15+")}
        >
          <Text
            className={`text-lg font-medium ${
              goal === "15+" ? "text-white" : "text-black"
            }`}
          >
            15+ mins daily
          </Text>
        </TouchableOpacity>
      </View>
      
      <View className="absolute bottom-12 w-full items-center z-30">
        <TouchableOpacity
          className="bg-buttonBg px-40 py-4 rounded-2xl mb-4"
          onPress={() => router.push({pathname: "/splash2", params: { goal }})}
        >
          <Text className="text-lg text-white font-semibold">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
