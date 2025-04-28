import React, { useRef, useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions, CameraType } from "expo-camera";
import * as tf from "@tensorflow/tfjs";
import { decodeJpeg } from "@tensorflow/tfjs-react-native";
import * as FileSystem from "expo-file-system";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useModel } from "./ModelContext";

import "@tensorflow/tfjs-backend-webgl";

export default function CameraScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState<CameraType>("front");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCorrectSign, setIsCorrectSign] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const expectedSignId = 0; // Expected class index for "A"

  const { classifierModel, handDetector } = useModel();

  const preprocessKeypoints = (keypoints: { x: number, y: number }[]) => {
    const xCoords = keypoints.map((p) => p.x);
    const yCoords = keypoints.map((p) => p.y);

    const centerX = (Math.min(...xCoords) + Math.max(...xCoords)) / 2;
    const centerY = (Math.min(...yCoords) + Math.max(...yCoords)) / 2;

    const shifted = keypoints.map((p) => [p.x - centerX, p.y - centerY]);

    const maxX = Math.max(...shifted.map(([x]) => Math.abs(x)));
    const maxY = Math.max(...shifted.map(([, y]) => Math.abs(y)));
    const maxVal = Math.max(maxX, maxY) || 1;

    const normalized = shifted.map(([x, y]) => [x / maxVal, y / maxVal]);
    return normalized.flat();
  };

  const validateSign = async () => {
    if (!cameraRef.current || !classifierModel || !handDetector) {
      console.log("Missing camera ref or models not loaded");
      setIsCorrectSign(false);
      return;
    }

    const classNames = [
      "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
      "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
      "U", "V", "W", "X", "Y", "Z"
    ];

    const expectedSign = "A";

    setIsLoading(true);
    try {
      // Take a small photo
      const photo = await cameraRef.current.takePictureAsync({ base64: false, quality: 0.4 });

      if (!photo) {
        console.error("Photo capture failed");
        setIsCorrectSign(false);
        setIsLoading(false);
        return;
      }

      const imgB64 = await FileSystem.readAsStringAsync(photo.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;
      const raw = new Uint8Array(imgBuffer);
      const imgTensor = decodeJpeg(raw);

      const hands = await handDetector.estimateHands(imgTensor, {
        flipHorizontal: cameraType === "front",
      });

      if (hands.length > 0 && hands[0].keypoints?.length === 21) {
        const keypoints = hands[0].keypoints;
        const normalizedKeypoints = preprocessKeypoints(keypoints);
        const inputTensor = tf.tensor2d([normalizedKeypoints]);

        const prediction = classifierModel.predict(inputTensor) as tf.Tensor;
        const predictionData = await prediction.data();

        const predictionArray = Array.from(predictionData);
        const maxProbability = Math.max(...predictionArray);
        const maxIndex = predictionData.indexOf(maxProbability);

        const predictedSign = classNames[maxIndex];

        console.log(`Prediction result: ${predictedSign} with confidence ${maxProbability}`);

        if (predictedSign === expectedSign && maxProbability > 0.8) {
          setIsCorrectSign(true);
          tf.dispose([imgTensor, inputTensor, prediction]);

          setTimeout(() => {
            router.back();
          }, 2000);
        } else {
          setIsCorrectSign(false);
          tf.dispose([imgTensor, inputTensor, prediction]);
        }
        
      } else {
        console.log("No hand detected or incomplete landmarks");
        setIsCorrectSign(false);
      }
    } catch (error) {
      console.error("Error during validation:", error);
      setIsCorrectSign(false);
    }
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      setIsCameraActive(true);
      return () => setIsCameraActive(false);
    }, [])
  );

  const toggleCameraType = () => {
    setCameraType((prev) => (prev === "back" ? "front" : "back"));
  };

  if (!permission?.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white text-lg mb-4">
          Camera access is required
        </Text>
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
        <Text className="text-2xl font-bold text-center my-4">
          Show the sign for "A"
        </Text>

        <View className="overflow-hidden rounded-xl mx-4">
          {isCameraActive ? (
            <CameraView
              ref={cameraRef}
              style={{ height: 400, width: "100%" }}
              facing={cameraType}
              enableTorch={false}
            />
          ) : (
            <View
              style={{ height: 400, width: "100%", backgroundColor: "#222" }}
            />
          )}
        </View>

        {isCorrectSign !== null && (
          <View className="items-center mt-4">
            <Text
              className={`text-xl ${
                isCorrectSign ? "text-green-600" : "text-red-600"
              }`}
            >
              {isCorrectSign ? "Perfect! Moving to next level..." : "Try again!"}
            </Text>
          </View>
        )}

        {isLoading && (
          <View className="items-center mt-4">
            <Text className="text-xl text-blue-600">Checking sign...</Text>
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
            disabled={!classifierModel || !handDetector}
          >
            <Text className="text-white font-semibold">
              {classifierModel && handDetector ? "Check Sign" : "Loading models..."}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
