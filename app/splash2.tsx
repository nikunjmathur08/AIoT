import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

export default function SplashScreen2() {
  const router = useRouter();
  const { goal } = useLocalSearchParams();
  const goalString = goal as string;

  const gesturesPerMonth = (() => {
    switch (goalString) {
      case "5":
        return 30;
      case "10":
        return 60;
      case "15":
        return 100;
      case "16":
        return 120;
      default:
        return 2;
    }
  })();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.replace("/level");
  //   }, 1500);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 items-center justify-center">
        {/* Text block */}
        <View className="items-center">
          <Image 
            source={require("../assets/WOW.png")}
          />
          <Text className="text-base text-grey-dark text-center px-10 mt-4">
            With {goalString} mins a day you can learn {'\n'} {gesturesPerMonth} new gestures per month!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
