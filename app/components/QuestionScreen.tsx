import React, { useState } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Import SVGs
import A from "../../assets/alphabets/A.svg";
import B from "../../assets/alphabets/B.svg";
import C from "../../assets/alphabets/C.svg";
import D from "../../assets/alphabets/D.svg";
import E from "../../assets/alphabets/E.svg";
import F from "../../assets/alphabets/F.svg";
import G from "../../assets/alphabets/G.svg";
import H from "../../assets/alphabets/H.svg";
import I from "../../assets/alphabets/I.svg";
import J from "../../assets/alphabets/J.svg";
import K from "../../assets/alphabets/K.svg";
import L from "../../assets/alphabets/L.svg";
import M from "../../assets/alphabets/M.svg";
import N from "../../assets/alphabets/N.svg";
import O from "../../assets/alphabets/O.svg";
import P from "../../assets/alphabets/P.svg";
import Q from "../../assets/alphabets/Q.svg";
import R from "../../assets/alphabets/R.svg";
import S from "../../assets/alphabets/S.svg";
import T from "../../assets/alphabets/T.svg";
import U from "../../assets/alphabets/U.svg";
import V from "../../assets/alphabets/V.svg";
import W from "../../assets/alphabets/W.svg";
import X from "../../assets/alphabets/X.svg";
import Y from "../../assets/alphabets/Y.svg";
import Z from "../../assets/alphabets/Z.svg";

// Create a mapping object for easy access
const svgMap: { [key: string]: React.FC<any> } = {
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R,
  S,
  T,
  U,
  V,
  W,
  X,
  Y,
  Z,
};

// Define specific route types that match Expo Router's expectations
type AppRoutes = "/" | "/camera" | "/goal" | string;

interface QuestionScreenProps {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  nextRoute: AppRoutes;
}

export default function QuestionScreen({
  question,
  options,
  correctAnswerIndex,
  nextRoute,
}: QuestionScreenProps) {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
  };

  const renderOption = (option: string) => {
    // If it's a letter that corresponds to an SVG
    if (option && svgMap[option]) {
      const SvgComponent = svgMap[option];
      return <SvgComponent width="60%" height="60%" />;
    }
    // If it's an image URL
    else if (
      option &&
      typeof option === "string" &&
      (option.startsWith("http") || option.endsWith(".svg"))
    ) {
      return (
        <img
          src={option}
          style={{ width: "60%", height: "60%" }}
          alt={`Option ${option}`}
        />
      );
    }
    // Default: render as text
    else {
      return <Text className="text-4xl">{option}</Text>;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 bg-primary px-6 pt-8">
        {/* Back button */}
        <Pressable onPress={() => router.back()} className="mb-8">
          <Text className="text-2xl">←</Text>
        </Pressable>

        <Text className="text-2xl font-bold mb-8">{question}</Text>

        {/* Options */}
        <View className="flex-row flex-wrap justify-between">
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              className={`w-[48%] aspect-square ${
                selectedAnswer === index ? "bg-secondary" : "bg-white"
              } rounded-xl mb-4 items-center justify-center`}
              onPress={() => handleAnswerSelect(index)}
              disabled={showFeedback}
            >
              {renderOption(option)}
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback message */}
        {showFeedback && (
          <View className="flex-row items-center mt-32">
            {selectedAnswer === correctAnswerIndex ? (
              <>
                <Text className="text-2xl font-semibold mr-2">✓</Text>
                <Text className="text-xl font-semibold text-gray-600">
                  Awesome!
                </Text>
              </>
            ) : (
              <>
                <Text className="text-2xl mr-2">✗</Text>
                <Text className="text-xl text-gray-600">Try again!</Text>
              </>
            )}
          </View>
        )}

        {/* Continue button - Fixed centered position */}
        {showFeedback && selectedAnswer === correctAnswerIndex && (
          <View className="absolute bottom-12 left-0 right-0 items-center">
            <TouchableOpacity
              className="bg-buttonBg py-4 px-10 rounded-2xl w-4/5 items-center"
              onPress={() => router.push(nextRoute)}
            >
              <Text className="text-lg text-white font-semibold">Continue</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}