import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import QuestionScreen from './components/QuestionScreen';
import { View } from 'react-native';

// Import SVGs
import A from '../assets/alphabets/A.svg';
import B from '../assets/alphabets/B.svg';
import C from '../assets/alphabets/C.svg';
import D from '../assets/alphabets/D.svg';
import E from '../assets/alphabets/E.svg';
import F from '../assets/alphabets/F.svg';
import G from '../assets/alphabets/G.svg';
import H from '../assets/alphabets/H.svg';
import I from '../assets/alphabets/I.svg';
import J from '../assets/alphabets/J.svg';
import K from '../assets/alphabets/K.svg';
import L from '../assets/alphabets/L.svg';
import M from '../assets/alphabets/M.svg';
import N from '../assets/alphabets/N.svg';
import O from '../assets/alphabets/O.svg';
import P from '../assets/alphabets/P.svg';
import Q from '../assets/alphabets/Q.svg';
import R from '../assets/alphabets/R.svg';
import S from '../assets/alphabets/S.svg';
import T from '../assets/alphabets/T.svg';
import U from '../assets/alphabets/U.svg';
import V from '../assets/alphabets/V.svg';
import W from '../assets/alphabets/W.svg';
import X from '../assets/alphabets/X.svg';
import Y from '../assets/alphabets/Y.svg';
import Z from '../assets/alphabets/Z.svg';

const alphabetSvgs = [
  { letter: 'A', svg: A },
  { letter: 'B', svg: B },
  { letter: 'C', svg: C },
  { letter: 'D', svg: D },
  { letter: 'E', svg: E },
  { letter: 'F', svg: F },
  { letter: 'G', svg: G },
  { letter: 'H', svg: H },
  { letter: 'I', svg: I },
  { letter: 'J', svg: J },
  { letter: 'K', svg: K },
  { letter: 'L', svg: L },
  { letter: 'M', svg: M },
  { letter: 'N', svg: N },
  { letter: 'O', svg: O },
  { letter: 'P', svg: P },
  { letter: 'Q', svg: Q },
  { letter: 'R', svg: R },
  { letter: 'S', svg: S },
  { letter: 'T', svg: T },
  { letter: 'U', svg: U },
  { letter: 'V', svg: V },
  { letter: 'W', svg: W },
  { letter: 'X', svg: X },
  { letter: 'Y', svg: Y },
  { letter: 'Z', svg: Z },
];

export default function LevelScreen() {
  const router = useRouter();
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);

  useEffect(() => {
    generateOptions();
  }, []);

  const generateOptions = () => {
    // Use 'A' as the correct answer for now
    const correct = alphabetSvgs[0];

    // Get 3 random wrong options
    const wrongOptions = alphabetSvgs
      .filter(item => item.letter !== correct.letter)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    // Create identifiers for SVGs (instead of passing components directly)
    // We'll use the letter as an identifier
    const allOptions = [...wrongOptions, correct]
      .sort(() => 0.5 - Math.random())
      .map(item => item.letter);

    // Find the index of the correct answer
    const correctIndex = allOptions.findIndex(letter => letter === correct.letter);

    setOptions(allOptions);
    setCorrectAnswerIndex(correctIndex);
  };

  return (
    <QuestionScreen
      question="Select the correct image representing 'A'"
      options={options}
      correctAnswerIndex={correctAnswerIndex}
      nextRoute="/camera"
    />
  );
}