import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Exercise = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="bg-primary">
        <Text>Exercise</Text>
      </View>
    </SafeAreaView>
  );
};

export default Exercise;
