import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle, Line, Rect } from 'react-native-svg';
import * as FileSystem from 'expo-file-system'; // if you want logging

// Calculate bounding rectangle
export const calcBoundingRect = (landmarks, imageWidth, imageHeight) => {
  const points = landmarks.map((landmark) => ({
    x: Math.min(Math.floor(landmark.x * imageWidth), imageWidth - 1),
    y: Math.min(Math.floor(landmark.y * imageHeight), imageHeight - 1),
  }));

  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);

  const xMin = Math.min(...xs);
  const yMin = Math.min(...ys);
  const xMax = Math.max(...xs);
  const yMax = Math.max(...ys);

  return { x: xMin, y: yMin, width: xMax - xMin, height: yMax - yMin };
};

// Convert landmark list
export const calcLandmarkList = (landmarks, imageWidth, imageHeight) => {
  return landmarks.map((landmark) => [
    Math.min(Math.floor(landmark.x * imageWidth), imageWidth - 1),
    Math.min(Math.floor(landmark.y * imageHeight), imageHeight - 1),
  ]);
};

// Preprocess landmarks
export const preProcessLandmark = (landmarkList) => {
  const baseX = landmarkList[0][0];
  const baseY = landmarkList[0][1];

  const relativeLandmarks = landmarkList.map(([x, y]) => [x - baseX, y - baseY]);
  const flattened = relativeLandmarks.flat();

  const maxVal = Math.max(...flattened.map((n) => Math.abs(n)));

  const normalized = flattened.map((n) => n / maxVal);

  return normalized;
};

// Drawing the hand skeleton
export const HandSkeleton = ({ landmarks, imageWidth, imageHeight }) => {
  const lines = [
    // Thumb
    [2, 3], [3, 4],
    // Index
    [5, 6], [6, 7], [7, 8],
    // Middle
    [9, 10], [10, 11], [11, 12],
    // Ring
    [13, 14], [14, 15], [15, 16],
    // Pinky
    [17, 18], [18, 19], [19, 20],
    // Palm connections
    [0, 1], [1, 2], [2, 5], [5, 9], [9, 13], [13, 17], [17, 0],
  ];

  return (
    <Svg width={imageWidth} height={imageHeight} style={{ position: 'absolute' }}>
      {/* Draw bones */}
      {lines.map(([start, end], idx) => (
        <Line
          key={`line-${idx}`}
          x1={landmarks[start][0]}
          y1={landmarks[start][1]}
          x2={landmarks[end][0]}
          y2={landmarks[end][1]}
          stroke="white"
          strokeWidth={2}
        />
      ))}
      {/* Draw joints */}
      {landmarks.map(([x, y], idx) => (
        <Circle
          key={`circle-${idx}`}
          cx={x}
          cy={y}
          r={idx % 4 === 0 ? 6 : 4} // Bigger radius at fingertips
          fill="white"
          stroke="black"
          strokeWidth={1}
        />
      ))}
    </Svg>
  );
};

// Drawing bounding box
export const BoundingBox = ({ rect }) => (
  <Svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
    <Rect
      x={rect.x}
      y={rect.y}
      width={rect.width}
      height={rect.height}
      stroke="red"
      strokeWidth={2}
      fill="transparent"
    />
  </Svg>
);

// Logging to CSV (for Expo or bare RN)
export const logToCsv = async (number, landmarks, filePath = FileSystem.documentDirectory + 'Alphabet_keys.csv') => {
  const row = [number, ...landmarks].join(',') + '\n';
  try {
    await FileSystem.writeAsStringAsync(filePath, row, { encoding: FileSystem.EncodingType.UTF8, append: true });
    console.log('Logged successfully');
  } catch (error) {
    console.error('Failed to log:', error);
  }
};
