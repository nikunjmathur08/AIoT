import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

import WOW from "../assets/WOW.svg"

export default function SplashScreen2() {
  const router = useRouter();
  const { goal } = useLocalSearchParams();
  const goalString = goal as string;

  useEffect(() => {
      const timer = setTimeout(() => {
        router.replace("/program");
      }, 1500);
  
      return () => clearTimeout(timer);
    }, []);

  const gesturesPerMonth = (() => {
    switch (goalString) {
      case "5":
        return 30;
      case "10":
        return 60;
      case "15":
        return 100;
      case "15+":
        return 120;
      default:
        return 2;
    }
  })();

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 items-center justify-center">
        {/* Text block */}
        <View className="items-center">
          <WOW width={300} height={150}/>
          <Text className="text-base text-grey-dark text-center px-10 mt-4">
            With {goalString} mins a day you can learn {'\n'} {gesturesPerMonth} new gestures per month!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
