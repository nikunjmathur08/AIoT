import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions, CameraType } from "expo-camera";
import { useFocusEffect } from "@react-navigation/native";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState<CameraType>("front");
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const cameraRef = useRef(null);

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
      <View className="flex-1 overflow-hidden rounded-xl">
        {isCameraActive ? (
          <CameraView
            ref={cameraRef}
            style={{ height: 300, width: 200, alignSelf: "center" }}
            facing={cameraType}
          />
        ) : (
          <View style={{ height: 300, width: 200, alignSelf: "center", backgroundColor: "#222" }} />
        )}
      </View>

      <TouchableOpacity
        className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full"
        onPress={toggleCameraType}
      >
        <Text className="text-black font-semibold">Flip Camera</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}