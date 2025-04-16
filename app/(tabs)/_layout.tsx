import React from "react";
import { Tabs, usePathname } from "expo-router";
import { View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Home, ChartSpline, Dumbbell, User, Camera } from "lucide-react-native";

const routes = [
  { name: "/home", icon: <Home /> },
  { name: "/leaderboard", icon: <ChartSpline /> },
  { name: "/exercise", icon: <Dumbbell /> },
  { name: "/profile", icon: <User /> },
  { name: "/camera", icon: <Camera /> },
] as const;

export default function TabsLayout() {
  const pathname = usePathname();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      >
        {routes.map((route) => (
          <Tabs.Screen
            key={route.name}
            name={route.name.replace("/", "")}
            options={{ headerShown: false }}
          />
        ))}
      </Tabs>

      {/* Custom Bottom Navigation */}
      <View className="absolute bottom-6 self-center bg-buttonBgSec bg-opacity-80 flex-row justify-around items-center px-6 py-3 rounded-2xl w-[90%] mb-4">
        {routes.map(({ name, icon }) => (
          <Link key={name} href={name} asChild>
            <TouchableOpacity>
              <View className="px-2">
                {React.cloneElement(icon, {
                  color: pathname === name ? "#dd7056" : "#000",
                })}
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </>
  );
}
