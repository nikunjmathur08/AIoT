import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Streak from "../assets/Streak.svg";

const days = [
  { label: "Mon", active: true },
  { label: "Tue", active: false },
  { label: "Wed", active: false },
  { label: "Thu", active: false },
  { label: "Fri", active: false },
  { label: "Sat", active: false },
  { label: "Sun", active: false },
];

export default function DayStreak() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centered}>
        <View style={styles.streakContainer}>
          <View style={styles.streakNumberWrap}>
            <Streak className="w-80 h-80"/>
          </View>
          <Text style={styles.streakLabel}>Day Streak!</Text>
          <View style={styles.daysRow}>
            {days.map((day, idx) => (
              <View key={day.label} style={[styles.dayCircle, day.active && styles.dayActive]}> 
                <Text style={[styles.dayFace, day.active && styles.dayFaceActive]}> {day.active ? "😊" : "😴"} </Text>
                <Text style={[styles.dayLabel, day.active && styles.dayLabelActive]}>{day.label}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.streakHint}>Practice each day so{"\n"}your streak won't reset!</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => router.replace("/(tabs)/home")}> 
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FBF7",
    justifyContent: "space-between",
    alignItems: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  streakContainer: {
    alignItems: "center",
    width: "100%",
    marginTop: 40,
  },
  streakNumberWrap: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  streakFace: {
    position: "absolute",
    top: 18,
    left: screenWidth / 2 - 90,
    width: 120,
    height: 80,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.18,
  },
  streakFaceEyes: {
    fontSize: 22,
    color: "#222",
    textAlign: "center",
    marginTop: 10,
  },
  streakFaceSmile: {
    fontSize: 18,
    color: "#222",
    textAlign: "center",
    marginTop: -8,
  },
  streakNumber: {
    fontSize: 180,
    color: "#F97E7E",
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "#E6ECE8",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 8,
    marginBottom: -24,
    opacity: 0.95,
  },
  streakLabel: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 24,
    textAlign: "center",
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E6ECE8",
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  dayCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#D9E2DD",
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  dayActive: {
    backgroundColor: "#F97E7E",
  },
  dayFace: {
    fontSize: 18,
    color: "#888",
    marginBottom: 0,
    textAlign: "center",
  },
  dayFaceActive: {
    color: "#fff",
  },
  dayLabel: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    marginTop: -2,
  },
  dayLabelActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  streakHint: {
    fontSize: 15,
    color: "#222",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  button: {
    width: "90%",
    backgroundColor: "#3D3D3D",
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 32,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
});