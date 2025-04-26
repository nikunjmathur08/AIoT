// app/components/CameraScreen.tsx
import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Animated } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as tf from '@tensorflow/tfjs';
import * as ImageManipulator from 'expo-image-manipulator';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';

interface CameraScreenProps {
  expectedSignId: number;
}

export default function CameraScreen({ expectedSignId }: CameraScreenProps) {
  const router = useRouter();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCorrectSign, setIsCorrectSign] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scale] = useState(new Animated.Value(1));

  useEffect(() => {
    (async () => {
      await tf.ready();
      await tf.setBackend('rn-webgl');
      const modelJson = require('../../assets/model/model.json');
      const modelWeights = [require('../../assets/model/group1-shard1of1.bin')];
      const loadedModel = await tf.loadGraphModel(bundleResourceIO(modelJson, modelWeights));
      setModel(loadedModel);
    })();
  }, []);

  const preprocessImage = async (uri: string) => {
    const manipulated = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 224, height: 224 } }],
      { base64: true }
    );

    const imgBuffer = tf.util.encodeString(manipulated.base64 || '', 'base64').buffer;
    const raw = new Uint8Array(imgBuffer);
    const imageTensor = decodeJpeg(raw).toFloat().div(255.0).expandDims(0);

    return imageTensor;
  };

  const triggerCelebration = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.5, duration: 300, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();
  };

  const validateSign = async () => {
    if (!cameraRef.current || !model) {
      setIsCorrectSign(false);
      return;
    }

    setIsLoading(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({ base64: false });

      if (!photo) {
        console.error("Photo capture failed");
        setIsCorrectSign(false);
        setIsLoading(false);
        return;
      }

      const inputTensor = await preprocessImage(photo.uri);
      const prediction = model.predict(inputTensor) as tf.Tensor;
      const predictedIndex = prediction.argMax(-1).dataSync()[0];

      const isCorrect = predictedIndex === expectedSignId;
      setIsCorrectSign(isCorrect);

      if (isCorrect) {
        triggerCelebration();
        setTimeout(() => router.replace("/home"), 2000);
      }
    } catch (error) {
      console.error("Error validating sign:", error);
      setIsCorrectSign(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (permission?.status === "granted") {
      setIsCameraActive(true);
    }
  }, [permission]);

  if (!permission?.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white text-lg mb-5">Camera access is required</Text>
        <TouchableOpacity onPress={requestPermission} className="bg-white px-6 py-3 rounded-full">
          <Text className="text-black font-semibold text-lg">Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4 py-6">
        <Animated.Text style={{ transform: [{ scale }] }} className="text-center text-2xl font-bold mb-4">
          Show the correct sign!
        </Animated.Text>

        <View className="h-[400px] rounded-2xl overflow-hidden bg-black">
          {isCameraActive ? (
            <CameraView ref={cameraRef} className="flex-1" />
          ) : (
            <View className="flex-1 bg-gray-800" />
          )}
        </View>

        {isCorrectSign !== null && (
          <Text className={`text-center text-2xl mt-6 ${isCorrectSign ? 'text-green-500' : 'text-red-500'}`}>
            {isCorrectSign ? "Perfect!" : "Try again!"}
          </Text>
        )}

        {isLoading && (
          <ActivityIndicator size="large" color="#0000ff" className="mt-5" />
        )}

        <View className="flex-row justify-center mt-8">
          <TouchableOpacity onPress={validateSign} className="bg-blue-500 px-6 py-3 rounded-full">
            <Text className="text-white font-bold text-lg">Check Sign</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
