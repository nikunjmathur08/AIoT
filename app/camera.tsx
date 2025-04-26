import React, { useRef, useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions, CameraType } from "expo-camera";
import * as tf from '@tensorflow/tfjs';
import * as tflite from '@tensorflow/tfjs-tflite';
import { Asset } from 'expo-asset';
import * as FileSystem from "expo-file-system";
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";

export default function CameraScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState<CameraType>("front");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCorrectSign, setIsCorrectSign] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState<any>(null);
  const cameraRef = useRef<CameraView>(null);
  const expectedSignId = 0; // For "A"

  async function loadModel() {
    await tf.ready();
    await tf.setBackend('rn-webgl'); // Optional but better

    const asset = Asset.fromModule(require('../assets/model/keypoint_classifier.tflite'));
    await asset.downloadAsync();

    const modelUri = asset.localUri || asset.uri;

    const modelBuffer = await FileSystem.readAsStringAsync(modelUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const model = await tflite.loadTFLiteModel(modelBuffer);
    return model;
  }

  useEffect(() => {
    (async () => {
      await tf.ready();
      await tf.setBackend('rn-webgl'); // Optional but better
  
      const modelAsset = Asset.fromModule(require('../assets/model/keypoint_classifier.tflite'));
      await modelAsset.downloadAsync();
  
      const modelBase64 = await FileSystem.readAsStringAsync(modelAsset.localUri!, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      // Convert Base64 string to ArrayBuffer
      const modelEncoded = tf.util.encodeString(modelBase64, 'base64');
      const modelBuffer = new Uint8Array(modelEncoded).buffer;

      // Load the model
      const loadedModel = await tflite.loadTFLiteModel(modelBuffer);
      setModel(loadedModel);
    })();
  }, []);

  const preprocessImage = async (uri: string) => {
    const imgB64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer);

    const imgTensor = decodeJpeg(raw);
    const resized = tf.image.resizeBilinear(imgTensor, [224, 224])
      .div(255)
      .expandDims(0);

    return resized;
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
      const output = await model.predict(inputTensor);
      const prediction = output.argMax(-1).dataSync()[0];

      setIsCorrectSign(prediction === expectedSignId);

      setTimeout(() => {
        if (prediction === expectedSignId) router.back();
      }, 2000);
    } catch (error) {
      console.error(error);
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
    setCameraType(prev => prev === "back" ? "front" : "back");
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
              enableTorch={false}
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
          >
            <Text className="text-white font-semibold">Check Sign</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
