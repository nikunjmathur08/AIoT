import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function LevelScreen() {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const correctAnswer = 0; // Index of the correct answer (👊)

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

        <Text className="text-2xl font-bold mb-8">Select the correct image representing A</Text>

        {/* Sign language options */}
        <View className="flex-row flex-wrap justify-between">
          {["👊", "☝️", "✋", "🤌"].map((sign, index) => (
            <TouchableOpacity
              key={index}
              className={`w-[48%] aspect-square ${selectedAnswer === index ? 'bg-secondary' : 'bg-white'} rounded-xl mb-4 items-center justify-center`}
              onPress={() => handleAnswerSelect(index)}
              disabled={showFeedback}
            >
              <Text className={`text-4xl ${selectedAnswer === index ? 'text-white' : 'text-black'}`}>{sign}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback message */}
        {showFeedback && (
          <View className="flex-row items-center mt-32">
            {selectedAnswer === correctAnswer ? (
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
        {showFeedback && selectedAnswer === correctAnswer && (
          <View className="absolute bottom-12 w-full left-0 items-center">
            <TouchableOpacity 
              className="bg-buttonBg px-40 py-4 rounded-2xl"
              onPress={() => router.push('/camera')}
            >
              <Text className="text-xl text-white font-semibold">Continue</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}