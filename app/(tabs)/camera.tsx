import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions, CameraType } from "expo-camera";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";

export default function CameraScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState<CameraType>("front");
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isCorrectSign, setIsCorrectSign] = useState<boolean | null>(null);
  const cameraRef = useRef(null);

  const validateSign = () => {
    // Simulating sign validation
    setIsCorrectSign(true);
    setTimeout(() => {
      router.back();
    }, 2000);
  };

  // Use React Navigation's useFocusEffect to handle screen focus changes
  useFocusEffect(
    React.useCallback(() => {
      // When the screen comes into focus, activate the camera
      setIsCameraActive(true);
      
      // When the screen goes out of focus, deactivate the camera
      return () => {
        setIsCameraActive(false);
      };
    }, [])
  );

  // Toggle camera type function
  const toggleCameraType = () => {
    setCameraType((prev: CameraType) => 
      prev === "back" ? "front" : "back"
    );
  };

  if (!permission?.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white text-lg mb-4">Camera access is required</Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="bg-white px-6 py-3 rounded-full"
        >
          <Text className="text-black font-semibold">Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1">
        <Text className="text-2xl font-bold text-center my-4">Show the sign for "A"</Text>
        
        <View className="overflow-hidden rounded-xl mx-4">
          {isCameraActive ? (
            <CameraView
              ref={cameraRef}
              style={{ height: 400, width: "100%" }}
              facing={cameraType}
            />
          ) : (
            <View style={{ height: 400, width: "100%", backgroundColor: "#222" }} />
          )}
        </View>

        {isCorrectSign !== null && (
          <View className="items-center mt-4">
            <Text className={`text-xl ${isCorrectSign ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrectSign ? 'Perfect! Moving to next level...' : 'Try again!'}
            </Text>
          </View>
        )}

        <View className="flex-row justify-center space-x-4 mt-8">
          <TouchableOpacity
            className="bg-white px-6 py-3 rounded-full"
            onPress={toggleCameraType}
          >
            <Text className="text-black font-semibold">Flip Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-secondary px-6 py-3 rounded-full"
            onPress={validateSign}
          >
            <Text className="text-white font-semibold">Check Sign</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}