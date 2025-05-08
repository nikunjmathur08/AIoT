import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Calendar, Dumbbell, Home, LineChart, User } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import UK from "../../assets/uk.svg";
import Fire from "../../assets/fire.svg";
import Gem from "../../assets/gem.svg";
import HomeCutie from "../../assets/homeCutie.svg";
import Path from "../../assets/path.svg";
import Completed from "../../assets/completed.svg";
import Incomplete from "../../assets/incomplete.svg";

const screenWidth = Dimensions.get("window").width;
const levelSize = 60;
const spacing = 50;

const levels = [
  { x: 20, y: 30, done: true, level: 1 },
  { x: 180, y: 120, done: false, level:2 },
  { x: 340, y: 255, done: false, level: 3 },
  { x: 180, y: 410, done: false, level: 4 },
  { x: 30, y: 550, done: false, level: 5 },
  { x: 175, y: 650, done: false, level: 6 },
];

export default function HomeScreen() {
  const router = useRouter();

  const handleLevelPress = (level: number) => {
    router.push("/splash3");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row bg-white items-center rounded-xl my-4 justify-between py-4 mx-4 px-4 z-10">
          <UK width={30} height={30}/>
          <View className="flex-row">
            <Fire width={40} height={40}/>
            <Text className="text-xl font-semibold ml-3 pt-2">1</Text>
          </View>
          <View className="flex-row">
            <HomeCutie width={40} height={40}/>
            <Text className="text-xl font-semibold ml-3 pt-2">5</Text>
          </View>
          <View className="flex-row">
            <Gem width={40} height={40}/>
            <Text className="text-xl font-semibold ml-3 pt-2">20</Text>
          </View>
        </View>

        {/* Unit Banner */}
        <View className="bg-secondary rounded-xl px-4 py-4 flex-row justify-between items-center mx-4 mb-4 z-10">
          <View>
            <Text className="text-white font-semibold text-xl">Unit 1</Text>
            <Text className="text-white text-md">Alphabets!</Text>
          </View>
          <Calendar color="white" />
        </View>

        {/* Path Scroll */}
        <ScrollView
          contentContainerStyle={{ height: 900 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="relative mt-10 z-0">
            {/* Curved line background */}
            <View className="-ml-24 mt-24">
              <Path width={600} height={600} />
            </View>

            {/* Level markers */}
            {levels.map((level, index) => (
              <View
                key={index}
                style={{
                  position: "absolute",
                  top: level.y,
                  left: level.x,
                  width: levelSize,
                  height: levelSize,
                  borderRadius: levelSize / 2,
                }}
                className="justify-center items-center"
              >
                <TouchableOpacity onPress={() => level.done && handleLevelPress(level.level)}>
                  <Text className="text-xl">
                    {level.done ? (
                      <Completed width={60} height={60}/>
                    ) : (
                      <Incomplete width={60} height={60}/>
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function Stat({ icon, value }: { icon: string; value: number }) {
  return (
    <View className="flex-row items-center gap-1">
      <Text className="text-lg">{icon}</Text>
      <Text className="text-lg font-semibold">{value}</Text>
    </View>
  );
}

function TabIcon({ icon }: { icon: JSX.Element }) {
  return <View className="px-2">{icon}</View>;
}
