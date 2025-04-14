import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import Level0 from "../assets/level0.svg"
import Level0Inv from "../assets/level0-inverted.svg"
import Level1 from "../assets/level1.svg"
import Level1Inv from "../assets/level1-inverted.svg"
import Level2 from "../assets/level2.svg"
import Level2Inv from "../assets/level2-inverted.svg"
import Level3 from "../assets/level3.svg"
import Level3Inv from "../assets/level3-inverted.svg"

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
          {level === '0' ? (
            <Level0Inv width={20} height={20} style={{ marginRight: 16 }}/>
          ) : (
            <Level0 width={20} height={20} style={{ marginRight: 16 }}/>
          )}
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
          {level === '1' ? (
            <Level1Inv width={20} height={20} style={{ marginRight: 16 }}/>
          ) : (
            <Level1 width={20} height={20} style={{ marginRight: 16 }}/>
          )}
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
          {level === '2' ? (
            <Level2Inv width={20} height={20} style={{ marginRight: 16 }}/>
          ) : (
            <Level2 width={20} height={20} style={{ marginRight: 16 }}/>
          )}
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
          {level === '3' ? (
            <Level3Inv width={20} height={20} style={{ marginRight: 16 }}/>
          ) : (
            <Level3 width={20} height={20} style={{ marginRight: 16 }}/>
          )}
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
