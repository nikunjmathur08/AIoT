import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { View, ActivityIndicator } from "react-native";

export default function Loading () {
  return (
    <SafeAreaProvider>
        <PaperProvider>
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#000" />
          </View>
        </PaperProvider>
      </SafeAreaProvider>
  )
}