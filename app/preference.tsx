import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Menu, Button, Divider } from "react-native-paper";
import { useRouter } from "expo-router";

export default function Preference() {
  const [language, setLanguage] = useState("English");
  const [selectedLanguage, setSelectedLanguage] = useState("ASL");
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();
  const nativeLanguages = ["English", "Hindi", "Tamil"];

  return (
    <View className="flex-1 bg-[#F1F5F1] px-6 pt-12">
      {/* Progress bar */}
      <View className="flex-row justify-between items-center mb-6">
        <Pressable onPress={() => router.back()}>
          <Text className="text-2xl">←</Text>
        </Pressable>
        <View className="flex-1 mx-4 h-2 rounded-full bg-gray-300">
          <View className="h-full w-1/3 bg-[#DF6B57] rounded-full" />
        </View>
        <Text className="text-lg font-medium">1/3</Text>
      </View>

      {/* Native language */}
      <Text className="text-lg font-bold mb-2">My native language</Text>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <TouchableOpacity
            className="bg-white rounded-xl px-4 py-4 flex-row items-center justify-between"
            onPress={() => setMenuVisible(true)}
          >
            <View className="flex-row items-center">
              <Image
                source={require("../assets/uk.png")}
                className="w-6 h-6 mr-2"
              />
              <Text className="text-base">{language}</Text>
            </View>
            <Image 
              source={require("../assets/down.png")}
              className="w-6 h-6"
            />
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
      <Text className="text-lg font-bold mb-3">I want to learn</Text>
      {/* ASL Option */}
      <TouchableOpacity
        className={`rounded-2xl px-4 py-3 mb-3 flex-row items-center ${
          selectedLanguage === "ASL" ? "bg-[#DF6B57]" : "bg-white"
        }`}
        onPress={() => setSelectedLanguage("ASL")}
      >
        <Image
          source={require("../assets/uk.png")}
          className="w-6 h-6 mr-2"
        />
        <Text
          className={`text-base font-medium ${
            selectedLanguage === "ASL" ? "text-white" : "text-black"
          }`}
        >
          ASL
        </Text>
      </TouchableOpacity>

      {/* BSL Option */}
      <TouchableOpacity
        className={`rounded-2xl px-4 py-3 flex-row items-center ${
          selectedLanguage === "BSL" ? "bg-[#DF6B57]" : "bg-white"
        }`}
        onPress={() => setSelectedLanguage("BSL")}
      >
        <Text className="text-xl mr-2">🫱🏾‍🫲🏽</Text>
        <Text
          className={`text-base font-medium ${
            selectedLanguage === "BSL" ? "text-white" : "text-black"
          }`}
        >
          BSL
        </Text>
      </TouchableOpacity>
    </View>
  );
}