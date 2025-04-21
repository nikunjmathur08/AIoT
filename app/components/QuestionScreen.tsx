import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

interface QuestionScreenProps {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  nextRoute: string;
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
              className={`w-[48%] aspect-square ${selectedAnswer === index ? 'bg-secondary' : 'bg-white'} rounded-xl mb-4 items-center justify-center`}
              onPress={() => handleAnswerSelect(index)}
              disabled={showFeedback}
            >
              {option.startsWith('http') || option.endsWith('.svg') ? (
                <Image 
                  source={typeof option === 'string' ? { uri: option } : option}
                  style={{ width: '60%', height: '60%' }}
                  resizeMode="contain"
                />
              ) : (
                <Text className={`text-4xl ${selectedAnswer === index ? 'text-white' : 'text-black'}`}>
                  {option}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback message */}
        {showFeedback && (
          <View className="flex-row items-center mt-32">
            {selectedAnswer === correctAnswerIndex ? (
              <>
                <Text className="text-2xl font-semibold mr-2">✓</Text>
                <Text className="text-xl font-semibold text-gray-600">Awesome!</Text>
              </>
            ) : (
              <>
                <Text className="text-2xl mr-2">✗</Text>
                <Text className="text-xl text-gray-600">Try again!</Text>
              </>
            )}
          </View>
        )}

        {/* Continue button */}
        {showFeedback && selectedAnswer === correctAnswerIndex && (
          <View className="absolute bottom-12 w-full left-0 items-center">
            <TouchableOpacity 
              className="bg-buttonBg px-40 py-4 rounded-2xl"
              onPress={() => router.push(nextRoute)}
            >
              <Text className="text-xl text-white font-semibold">Continue</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}