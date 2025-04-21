import React from 'react';
import QuestionScreen from './components/QuestionScreen';

export default function LevelScreen() {
  const options = ["👊", "☝️", "✋", "🤌"];
  const correctAnswerIndex = 0;

  return (
    <QuestionScreen
      question="Select the correct image representing A"
      options={options}
      correctAnswerIndex={correctAnswerIndex}
      nextRoute="/camera"
    />
  );
}