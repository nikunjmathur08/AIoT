import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import { Calendar, Dumbbell, Home, LineChart, User } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Path from "../../assets/path.svg";

const screenWidth = Dimensions.get("window").width;
const levelSize = 60;
const spacing = 50;

const levels = [
  { x: 20, y: 30, done: true },
  { x: 180, y: 120, done: false },
  { x: 340, y: 255, done: false },
  { x: 30, y: 550, done: false },
  { x: 180, y: 410, done: false },
  { x: 175, y: 650, done: false },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 bg-primary">
        {/* Header */}
        <View className="flex-row bg-white items-center rounded-xl my-4 justify-between py-4 mx-4 px-4">
          <Image
            source={{ uri: "https://flagcdn.com/w80/gb.png" }}
            className="w-6 h-6 rounded-full"
          />
          <View className="flex-row">
            <Image
              source={require("../../assets/fire.png")}
              className="w-6 h-6 mt-[2px]"
              resizeMode="cover"
            />
            <Text className="font-5xl font-semibold ml-3 pt-[3px]">1</Text>
          </View>
          <View className="flex-row">
            <Image
              source={require("../../assets/homeCutie.png")}
              className="w-6 h-6 mt-[2px]"
              resizeMode="cover"
            />
            <Text className="font-5xl font-semibold ml-3 pt-[3px]">5</Text>
          </View>
          <View className="flex-row">
            <Image
              source={require("../../assets/gem.png")}
              className="w-6 h-6 mt-[2px]"
              resizeMode="cover"
            />
            <Text className="font-5xl font-semibold ml-3 pt-[3px]">20</Text>
          </View>
        </View>

        {/* Unit Banner */}
        <View className="bg-secondary rounded-xl px-4 py-4 flex-row justify-between items-center mx-4 mb-4">
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
          <View className="relative mt-10">
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
                <Text className="text-xl">
                  {level.done ? (
                    <Image source={require("../../assets/completed.png")} />
                  ) : (
                    <Image source={require("../../assets/incomplete.png")} />
                  )}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Nav */}
        <View className="absolute bottom-6 self-center bg-[#DCE2D7] flex-row justify-around items-center px-6 py-3 rounded-2xl w-[90%] shadow">
          <TabIcon icon={<Home />} />
          <TabIcon icon={<LineChart />} />
          <TabIcon icon={<Dumbbell />} />
          <TabIcon icon={<User />} />
        </View>
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
