import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import { Calendar, Dumbbell, Home, LineChart, User } from "lucide-react-native";

const screenWidth = Dimensions.get("window").width;
const levelSize = 60;
const spacing = 50;

const levels = [
  { x: 10, y: 30, done: true },
  { x: 180, y: 140, done: false },
  { x: 360, y: 305, done: false },
  { x: 10, y: 670, done: false },
  { x: 175, y: 500, done: false },
  { x: 175, y: 780, done: false },
];

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-[#F4F7F0]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-10 pb-4">
        <Image
          source={{ uri: "https://flagcdn.com/w80/gb.png" }}
          className="w-6 h-6 rounded-full"
        />
        <View className="flex-row gap-4">
          <Stat icon="🔥" value={1} />
          <Stat icon="🍅" value={5} />
          <Stat icon="💎" value={20} />
        </View>
      </View>

      {/* Unit Banner */}
      <View className="bg-[#E17B6F] rounded-xl px-4 py-2 flex-row justify-between items-center mx-4 mb-4">
        <View>
          <Text className="text-white font-semibold text-base">Unit 1</Text>
          <Text className="text-white text-sm">Alphabets!</Text>
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
          <Image
            source={require("../../assets/path.png")}
            className="absolute px-8 w-full"
            style={{ height: 900 }}
            resizeMode="contain"
          />

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
              className={`${
                level.done ? "bg-levelDone" : "bg-levelNotDone"
              } justify-center items-center`}
            >
              <Text className="text-xl">{level.done ? "😊" : "😴"}</Text>
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
