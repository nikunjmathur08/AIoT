import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Leaderboard = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="bg-primary">
        <Text>Leaderboard</Text>
      </View>
    </SafeAreaView>
  );
};

export default Leaderboard;
