import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

import Sparkly from "../assets/Sparkly.svg"

export default function SplashScreen() {
  const router = useRouter();
  const { selectedLanguage } = useLocalSearchParams();
  const languageString = selectedLanguage as string;

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/level");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 items-center justify-between -mb-16">
        {/* Text block */}
        <View className="mt-32 items-center">
          <Text className="text-5xl font-bold text-black mb-2">WOW!</Text>
          <Text className="text-base text-grey-dark text-center px-10">
            More than 200k people are{'\n'}learning { languageString } worldwide!
          </Text>
        </View>

        {/* Cute character image */}
        <Sparkly width={600} height={600}/>
      </View>
    </SafeAreaView>
  );
}
