import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import KuchuPuchu from "../assets/KuchuPuchu.svg"

export default function SignupScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 bg-primary items-center pt-24 px-6">
        {/* Avatar */}
        <KuchuPuchu width={150} height={150}/>

        {/* Welcome Message */}
        <Text className="text-xl font-semibold text-center text-black my-8">
          Become a part of global{"\n"}sign language community!
        </Text>

        {/* <TouchableOpacity className="flex-row items-center justify-center bg-white w-full py-4 rounded-2xl mt-16 mb-4">
          <Image
            source={require("../assets/Google.png")}
            className="w-7 h-7 mr-4 -ml-4"
            resizeMode="contain"
          />
          <Text className="text-black text-base font-medium">
            Continue with Google
          </Text>
        </TouchableOpacity> */}

        {/* Facebook Button */}
        {/* <TouchableOpacity className="flex-row items-center justify-center bg-white w-full py-4 rounded-2xl mb-6">
          <Image
            source={require("../assets/Facebook.png")}
            className="w-7 h-7 mr-4"
            resizeMode="contain"
          />
          <Text className="text-black text-base font-medium">
            Continue with Facebook
          </Text>
        </TouchableOpacity> */}

        {/* Divider */}
        {/* <View className="flex-row items-center w-full mb-6">
          <View className="flex-1 h-px bg-black/30" />
          <Text className="mx-4 text-black font-semibold">or</Text>
          <View className="flex-1 h-px bg-black/30" />
        </View> */}

        {/* Email Signup */}
        <TouchableOpacity
          className="bg-buttonBgSec w-full py-4 rounded-2xl mb-4 mt-80"
          onPress={() => router.push("/preference")}
        >
          <Text className="text-xl text-center text-black font-semibold">
            Sign up with email
          </Text>
        </TouchableOpacity>

        {/* Login Prompt */}
        <Text className="text-sm text-black mt-2">
          Already using Signie? <Text className="font-bold text-secondary">Log in</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
