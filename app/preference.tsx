import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import { Menu } from "react-native-paper";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import UK from "../assets/uk.svg"

export default function Preference() {
  const [language, setLanguage] = useState("English");
  const [selectedLanguage, setSelectedLanguage] = useState("ASL");
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();
  const nativeLanguages = ["English"];

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 bg-primary px-6 pt-8">
        {/* Progress bar */}
        <View className="flex-row justify-between items-center mb-6">
          <Pressable onPress={() => router.back()}>
            <Text className="text-2xl">←</Text>
          </Pressable>
          <View className="flex-1 mx-4 h-2 rounded-full bg-grey">
            <View className="h-full w-1/3 bg-secondary rounded-full" />
          </View>
          <Text className="text-lg font-medium">1/3</Text>
        </View>

        {/* Native language */}
        <Text className="text-2xl font-bold my-8">My native language</Text>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity
              className="bg-white rounded-xl px-4 py-4 flex-row items-center justify-between"
              onPress={() => setMenuVisible(true)}
            >
              <View className="flex-row items-center">
                <UK width={20} height={20}/>
                <Text className="text-xl ml-2">{language}</Text>
              </View>
              {/* <Image
                source={require("../assets/down.png")}
                className="w-6 h-6"
              /> */}
            </TouchableOpacity>
          }
        >
          {nativeLanguages.map((item) => (
            <Menu.Item
              key={item}
              title={item}
              onPress={() => {
                setLanguage(item);
                setMenuVisible(false);
              }}
            />
          ))}
        </Menu>

        {/* I want to learn */}
        <Text className="text-2xl font-bold my-8">I want to learn</Text>
        {/* ASL Option */}
        <TouchableOpacity
          className={`rounded-2xl px-4 py-4 mb-4 flex-row items-center ${
            selectedLanguage === "ASL" ? "bg-secondary" : "bg-white"
          }`}
          onPress={() => setSelectedLanguage("ASL")}
        >
          <UK width={20} height={20}/>
          <Text
            className={`text-lg ml-2 font-medium ${
              selectedLanguage === "ASL" ? "text-white" : "text-black"
            }`}
          >
            ASL
          </Text>
        </TouchableOpacity>

        {/* BSL Option */}
        <TouchableOpacity
          className={`rounded-2xl px-4 py-3 flex-row items-center ${
            selectedLanguage === "BSL" ? "bg-secondary" : "bg-white"
          }`}
          onPress={() => setSelectedLanguage("BSL")}
        >
          <Text className="text-xl mr-2">🫱🏾‍🫲🏽</Text>
          <Text
            className={`text-lg font-medium ${
              selectedLanguage === "BSL" ? "text-white" : "text-black"
            }`}
          >
            BSL
          </Text>
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-12 w-full items-center z-30">
        <TouchableOpacity
          className="bg-buttonBg px-40 py-4 rounded-2xl mb-4"
          onPress={() => router.push({pathname: "/splash", params: { selectedLanguage }})}
        >
          <Text className="text-lg text-white font-semibold">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
