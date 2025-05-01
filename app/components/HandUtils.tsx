import React from 'react';
import Svg, { Circle, Line, Rect } from 'react-native-svg';
import * as FileSystem from 'expo-file-system';

// Type Definitions
type Landmark = {
  x: number;
  y: number;
};

type Point = {
  x: number;
  y: number;
};

type RectProps = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type HandSkeletonProps = {
  landmarks: [number, number][];
  imageWidth: number;
  imageHeight: number;
};

type BoundingBoxProps = {
  rect: RectProps;
};

// Extended WritingOptions to include the 'append' property
type ExtendedWritingOptions = FileSystem.WritingOptions & {
  append?: boolean;
};

type LogToCsv = (
  number: string,
  landmarks: number[],
  filePath?: string
) => Promise<void>;

// Calculate bounding rectangle from landmarks
export const calcBoundingRect = (
  landmarks: Landmark[],
  imageWidth: number,
  imageHeight: number
): RectProps => {
  const points: Point[] = landmarks.map((landmark) => ({
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
export const calcLandmarkList = (
  landmarks: Landmark[],
  imageWidth: number,
  imageHeight: number
): [number, number][] => {
  return landmarks.map((landmark) => [
    Math.min(Math.floor(landmark.x * imageWidth), imageWidth - 1),
    Math.min(Math.floor(landmark.y * imageHeight), imageHeight - 1),
  ]);
};

// Normalize landmarks for ML input
export const preProcessLandmark = (landmarkList: [number, number][]): number[] => {
  const baseX = landmarkList[0][0];
  const baseY = landmarkList[0][1];

  const relativeLandmarks = landmarkList.map(([x, y]) => [x - baseX, y - baseY]);
  const flattened = relativeLandmarks.flat();

  const maxVal = Math.max(...flattened.map((n) => Math.abs(n))) || 1;

  return flattened.map((n) => n / maxVal);
};

// Hand Skeleton Drawing
export const HandSkeleton: React.FC<HandSkeletonProps> = ({
  landmarks,
  imageWidth,
  imageHeight,
}) => {
  const lines: [number, number][] = [
    [2, 3], [3, 4],
    [5, 6], [6, 7], [7, 8],
    [9, 10], [10, 11], [11, 12],
    [13, 14], [14, 15], [15, 16],
    [17, 18], [18, 19], [19, 20],
    [0, 1], [1, 2], [2, 5], [5, 9], [9, 13], [13, 17], [17, 0],
  ];

  return (
    <Svg width={imageWidth} height={imageHeight} className="absolute">
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
      {landmarks.map(([x, y], idx) => (
        <Circle
          key={`circle-${idx}`}
          cx={x}
          cy={y}
          r={idx % 4 === 0 ? 6 : 4}
          fill="white"
          stroke="black"
          strokeWidth={1}
        />
      ))}
    </Svg>
  );
};

// Bounding Box Drawing
export const BoundingBox: React.FC<BoundingBoxProps> = ({ rect }) => (
  <Svg className="absolute w-full h-full">
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

// CSV Logger with fixed TypeScript type issue
export const logToCsv: LogToCsv = async (
  number,
  landmarks,
  filePath = FileSystem.documentDirectory + 'Alphabet_keys.csv'
) => {
  const row = [number, ...landmarks].join(',') + '\n';
  try {
    // Use type assertion to bypass TypeScript error
    const options: ExtendedWritingOptions = {
      encoding: FileSystem.EncodingType.UTF8,
      append: true,
    };
    
    await FileSystem.writeAsStringAsync(filePath, row, options as FileSystem.WritingOptions);
    console.log('Logged successfully');
  } catch (error) {
    console.error('Failed to log:', error);
  }
};