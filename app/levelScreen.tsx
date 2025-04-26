import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import QuestionScreen from './components/QuestionScreen';

import A from '../../assets/alphabets/A.svg';
import B from '../../assets/alphabets/B.svg';
import C from '../../assets/alphabets/C.svg';
import D from '../../assets/alphabets/D.svg';
import E from '../../assets/alphabets/E.svg';
import F from '../../assets/alphabets/F.svg';
import G from '../../assets/alphabets/G.svg';
import H from '../../assets/alphabets/H.svg';
import I from '../../assets/alphabets/I.svg';
import J from '../../assets/alphabets/J.svg';
import K from '../../assets/alphabets/K.svg';
import L from '../../assets/alphabets/L.svg';
import M from '../../assets/alphabets/M.svg';
import N from '../../assets/alphabets/N.svg';
import O from '../../assets/alphabets/O.svg';
import P from '../../assets/alphabets/P.svg';
import Q from '../../assets/alphabets/Q.svg';
import R from '../../assets/alphabets/R.svg';
import S from '../../assets/alphabets/S.svg';
import T from '../../assets/alphabets/T.svg';
import U from '../../assets/alphabets/U.svg';
import V from '../../assets/alphabets/V.svg';
import W from '../../assets/alphabets/W.svg';
import X from '../../assets/alphabets/X.svg';
import Y from '../../assets/alphabets/Y.svg';
import Z from '../../assets/alphabets/Z.svg';

const alphabetSvgs = [
  { letter: 'A', Svg: A },
  { letter: 'B', Svg: B },
  { letter: 'C', Svg: C },
  { letter: 'D', Svg: D },
  { letter: 'E', Svg: E },
  { letter: 'F', Svg: F },
  { letter: 'G', Svg: G },
  { letter: 'H', Svg: H },
  { letter: 'I', Svg: I },
  { letter: 'J', Svg: J },
  { letter: 'K', Svg: K },
  { letter: 'L', Svg: L },
  { letter: 'M', Svg: M },
  { letter: 'N', Svg: N },
  { letter: 'O', Svg: O },
  { letter: 'P', Svg: P },
  { letter: 'Q', Svg: Q },
  { letter: 'R', Svg: R },
  { letter: 'S', Svg: S },
  { letter: 'T', Svg: T },
  { letter: 'U', Svg: U },
  { letter: 'V', Svg: V },
  { letter: 'W', Svg: W },
  { letter: 'X', Svg: X },
  { letter: 'Y', Svg: Y },
  { letter: 'Z', Svg: Z },
];

export default function LevelScreen() {
  const router = useRouter();
  const [options, setOptions] = useState<{ letter: string; Svg: React.FC<any> }[]>([]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);

  useEffect(() => {
    generateOptions();
  }, []);

  const generateOptions = () => {
    const correct = alphabetSvgs[0]; // Fixed to 'A' for now

    const wrongOptions = alphabetSvgs
      .filter(item => item.letter !== correct.letter)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const mixedOptions = [...wrongOptions, correct].sort(() => 0.5 - Math.random());
    const correctIndex = mixedOptions.findIndex(item => item.letter === correct.letter);

    setOptions(mixedOptions);
    setCorrectAnswerIndex(correctIndex);
  };

  const handleCorrectSelection = () => {
    router.push({ pathname: '/camera', params: { expectedSignLetter: 'A' } });
  };

  return (
    <QuestionScreen
      question="Select the correct image representing 'A'"
      options={options}
      correctAnswerIndex={correctAnswerIndex}
      onCorrect={handleCorrectSelection}
    />
  );
}
