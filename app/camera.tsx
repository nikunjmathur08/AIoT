import React, { useRef, useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, Dimensions, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions, CameraType } from "expo-camera";
import { decodeJpeg } from "@tensorflow/tfjs-react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useModel } from "./ModelContext";
import {
  calcBoundingRect,
  calcLandmarkList,
  HandSkeleton,
  BoundingBox,
  preProcessLandmark } from "./components/HandUtils";
import * as tf from "@tensorflow/tfjs";
import * as FileSystem from "expo-file-system";
import "@tensorflow/tfjs-backend-webgl";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";

// Define types for hand landmarks
type Keypoint = {
  x: number;
  y: number;
  z?: number;
  name?: string;
};

// Props type for HandView component
type HandViewProps = {
  landmarks: Keypoint[];
};

export default function CameraScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState<CameraType>("front");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCorrectSign, setIsCorrectSign] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLandmarks, setCurrentLandmarks] = useState<Keypoint[] | null>(
    null
  );
  const cameraRef = useRef<CameraView>(null);
  const viewShotRef = useRef<ViewShot | null>(null);
  const expectedSignId = 0; // Expected class index for "A"

  const { classifierModel, handDetector } = useModel();
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  useEffect(() => {
    if (isCorrectSign) {
      const timer = setTimeout(() => {
        router.push('/Congratulations');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCorrectSign, router]);

  const HandView: React.FC<HandViewProps> = ({ landmarks }) => {
    if (!landmarks) return null;
    const landmarkList = calcLandmarkList(landmarks, screenWidth, 400); // camera preview height is 400
    const boundingRect = calcBoundingRect(landmarks, screenWidth, 400);

    return (
      <View className="absolute left-0 top-0 w-full h-[400px]">
        <HandSkeleton
          landmarks={landmarkList}
          imageWidth={screenWidth}
          imageHeight={400}
        />
        <BoundingBox rect={boundingRect} />
      </View>
    );
  };

  const saveHandImage = async () => {
    try {
      console.log("Saving image...");
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission required", "Enable photos access in Settings.");
        return;
      }
      
      if (!viewShotRef.current?.capture) {
        throw new Error("ViewShot not ready :<");
      }

      const uri = await viewShotRef.current?.capture?.();
      console.log("Captured uri:", uri);
      if (!uri) throw new Error("Capture failed");

      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert("Success", "Image saved to photos");
    } catch (error) {
      console.error("Save failed:", error);
      Alert.alert("Error", "Failed to save image");
    }
  };

  const preprocessKeypoints = (keypoints: Keypoint[]): number[] => {
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
      setCurrentLandmarks(null); // Clear previous landmarks if models not ready
      return;
    }

    setCurrentLandmarks(null); // Always clear previous landmarks before prediction
    setIsCorrectSign(null); // Reset sign correctness state

    const classNames = [
      "Q", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "A", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    ];

    const expectedSign = "A";
    setIsLoading(true);

    let imgTensor = null, inputTensor = null, prediction = null;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        base64: false,
        quality: 0.4,
      });

      if (!photo) throw new Error("Photo capture failed");

      const imgB64 = await FileSystem.readAsStringAsync(photo.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;
      const raw = new Uint8Array(imgBuffer);
      imgTensor = decodeJpeg(raw);

      const hands = await handDetector.estimateHands(imgTensor, {
        flipHorizontal: cameraType === "front",
      });

      if (hands.length > 0 && hands[0].keypoints?.length === 21) {
        const keypoints = hands[0].keypoints as Keypoint[];
        setCurrentLandmarks(keypoints);

        const landmarkList = keypoints.map((p) => [p.x, p.y]);
        const normalizedKeypoints = preProcessLandmark(landmarkList);
        inputTensor = tf.tensor2d([normalizedKeypoints]);

        prediction = classifierModel.predict(inputTensor) as tf.Tensor;
        const predictionData = await prediction.data();

        const predictionArray = Array.from(predictionData);
        const maxProbability = Math.max(...predictionArray);
        const maxIndex = predictionData.indexOf(maxProbability);
        const predictedSign = classNames[maxIndex];

        console.log(
          `Prediction result: ${predictedSign} with confidence ${maxProbability}`
        );

        if (predictedSign === expectedSign && maxProbability > 0.8) {
          setIsCorrectSign(true);
        } else if (maxProbability < 0.6) {
          setIsCorrectSign(false);
          Alert.alert("Uncertain", "Could not confidently recognize the sign. Try again!");
        } else {
          setIsCorrectSign(false);
        }
      } else {
        console.log("No hand detected or incomplete landmarks");
        setCurrentLandmarks(null); // Clear overlay if no hand detected
        setIsCorrectSign(false);
      }
    } catch (error) {
      console.error("Error during validation:", error);
      setCurrentLandmarks(null); // Clear overlay on error
      setIsCorrectSign(false);
    } finally {
      if (imgTensor) tf.dispose(imgTensor);
      if (inputTensor) tf.dispose(inputTensor);
      if (prediction) tf.dispose(prediction);
      setIsLoading(false);
    }
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

        <View className="overflow-hidden rounded-xl mx-4 relative">
          {isCameraActive ? (
            <CameraView
              ref={cameraRef}
              facing={cameraType}
              enableTorch={false}
              style={{ height: 400, width: "100%" }}
            />
          ) : (
            <View className="h-[400px] w-full bg-[#222]" />
          )}

          <ViewShot
            ref={viewShotRef}
            options={{ format: "jpg", quality: 0.9 }}
            style={{
              width: screenWidth,
              height: screenHeight,
              position: 'absolute',
              backgroundColor: 'transparent'
            }}
          >
            {currentLandmarks && <HandView landmarks={currentLandmarks} />}
          </ViewShot>
        </View>

        {isCorrectSign !== null && (
          <View className="items-center mt-4">
            <Text
              className={`text-xl ${
                isCorrectSign ? "text-green-600" : "text-red-600"
              }`}
            >
              {isCorrectSign
                ? "Perfect! Moving to next level..."
                : "Try again!"}
            </Text>
          </View>
        )}

        {isLoading && (
          <View className="items-center mt-4">
            <Text className="text-xl text-blue-600">Checking sign...</Text>
          </View>
        )}

        <View className="flex-row justify-center space-x-4 mt-8">
          {/* <TouchableOpacity
            className="bg-blue-500 px-6 py-3 rounded-full"
            onPress={saveHandImage}
            disabled={!currentLandmarks || isLoading}
          >
            <Text className="text-white font-semibold">
              {currentLandmarks? "Save Hand Preview" : "Detect Hand First"}
            </Text>
          </TouchableOpacity> */}
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
              {classifierModel && handDetector
                ? "Check Sign"
                : "Loading models..."}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}