import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ASLLevel() {
  const [level, setLevel] = useState("0");
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
            <View className="h-full w-2/3 bg-secondary rounded-full" />
          </View>
          <Text className="text-lg font-medium">2/3</Text>
        </View>

        {/* I want to learn */}
        <Text className="text-2xl font-bold my-8">How is your ASL?</Text>
        {/* Non-Existent */}
        <TouchableOpacity
          className={`rounded-2xl px-4 py-4 mb-4 flex-row items-center ${
            level === "0" ? "bg-secondary" : "bg-white"
          }`}
          onPress={() => setLevel("0")}
        >
          <Image
            source={require("../assets/level0.png")}
            className="w-4 h-4 mr-4"
          />
          <Text
            className={`text-lg font-medium ${
              level === "0" ? "text-white" : "text-black"
            }`}
          >
            Non-Existent
          </Text>
          {/* I know some words and phrases */}
        </TouchableOpacity>
        <TouchableOpacity
          className={`rounded-2xl px-4 py-4 mb-4 flex-row items-center ${
            level === "1" ? "bg-secondary" : "bg-white"
          }`}
          onPress={() => setLevel("1")}
        >
          <Image
            source={require("../assets/level1.png")}
            className="w-4 h-4 mr-4"
          />
          <Text
            className={`text-lg font-medium ${
              level === "1" ? "text-white" : "text-black"
            }`}
          >
            I know some words and phrases
          </Text>
        </TouchableOpacity>
        {/* I know a good amount */}
        <TouchableOpacity
          className={`rounded-2xl px-4 py-4 mb-4 flex-row items-center ${
            level === "2" ? "bg-secondary" : "bg-white"
          }`}
          onPress={() => setLevel("2")}
        >
          <Image
            source={require("../assets/level2.png")}
            className="w-4 h-4 mr-4"
          />
          <Text
            className={`text-lg font-medium ${
              level === "2" ? "text-white" : "text-black"
            }`}
          >
            I know a good amount
          </Text>
        </TouchableOpacity>
        {/* I can fully express myself */}
        <TouchableOpacity
          className={`rounded-2xl px-4 py-4 mb-4 flex-row items-center ${
            level === "3" ? "bg-secondary" : "bg-white"
          }`}
          onPress={() => setLevel("3")}
        >
          <Image
            source={require("../assets/level3.png")}
            className="w-4 h-4 mr-4"
          />
          <Text
            className={`text-lg font-medium ${
              level === "3" ? "text-white" : "text-black"
            }`}
          >
            I can fully express myself
          </Text>
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-12 w-full items-center z-30">
        <TouchableOpacity
          className="bg-buttonBg px-40 py-4 rounded-2xl mb-4"
          onPress={() => router.push("/goal")}
        >
          <Text className="text-lg text-white font-semibold">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
