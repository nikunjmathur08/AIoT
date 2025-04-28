import React, { createContext, useContext, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";

type ModelContextType = {
  classifierModel: tf.LayersModel | null;
  handDetector: handPoseDetection.HandDetector | null;
};

const ModelContext = createContext<ModelContextType>({
  classifierModel: null,
  handDetector: null,
});

export const ModelProvider = ({ children }: { children: React.ReactNode }) => {
  const [classifierModel, setClassifierModel] = useState<tf.LayersModel | null>(null);
  const [handDetector, setHandDetector] = useState<handPoseDetection.HandDetector | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await tf.ready();
        await tf.setBackend('rn-webgl');
        console.log("TensorFlow.js ready!");

        // Load classifier model
        const modelJson = require("../assets/model/model.json");
        const modelWeights = require("../assets/model/group1-shard1of1.bin");
        const loadedClassifier = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));

        // Load hand detector
        const detectorConfig = {
          runtime: 'tfjs',
          modelType: 'full',
          maxHands: 1,
        };
        const loadedHandDetector = await handPoseDetection.createDetector(
          handPoseDetection.SupportedModels.MediaPipeHands,
          detectorConfig
        );

        setClassifierModel(loadedClassifier);
        setHandDetector(loadedHandDetector);

        console.log("All models preloaded!");
      } catch (error) {
        console.error("Error preloading models:", error);
      }
    };

    loadModels();
  }, []);

  return (
    <ModelContext.Provider value={{ classifierModel, handDetector }}>
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => useContext(ModelContext);
