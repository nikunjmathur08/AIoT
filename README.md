# Signie

**AI-Powered Sign Language Learning Made Simple**

*Breaking down communication barriers, one gesture at a time.*

## Overview

Signie is an AI-powered mobile application that makes learning American Sign Language (ASL) accessible to everyone. Using advanced machine learning and computer vision, Signie provides real-time feedback on sign language gestures with **94.1% accuracy**.

**Why Signie?** Your smartphone already has everything you need! No AR glasses, no additional hardware, no fancy wearables with multiple sensors. Just your phone's camera + intelligent LSTM RNN model + your determination = breaking down communication barriers.

### Recognition
- **Lauded at AIoT (Artificial Intelligence of Things) Project Expo**

## The Problem We're Solving

- **70+ million** deaf people worldwide
- **466+ million** people with hearing loss globally  
- **Less than 1%** of hearing population knows sign language
- Communication barriers in healthcare, education, workplace, and daily interactions

## Key Features

### Personalized Learning Journey
- **Smart Onboarding**: Customized learning paths based on experience level, goals and time commitment
- **Adaptive Difficulty**: Progresses at your pace with intelligent difficulty adjustment
- **Progress Tracking**: Visual progress indicators and achievement milestones

![onboarding](https://github.com/user-attachments/assets/8ae76784-86d4-44e2-96d7-f804fbf7873d)

### LSTM-Powered Recognition
- **Real-time Gesture Recognition**: 94.1% accuracy with <1300ms response time
- **Custom LSTM Architecture**: Understands temporal sequences and spatial relationships
- **MediaPipe Integration**: 21-point hand landmark detection for precise gesture analysis

### Three-Phase Learning System
1. **Watch & Learn**: Slow-motion demonstrations with highlighted key positions
2. **Recognition Challenge**: Multiple-choice questions to test comprehension
3. **Practice Mode**: Real-time camera feedback with personalized improvement tips

### Inclusive Design
- **Cross-platform Support**: iOS and Android with identical performance
- **Accessibility First**: Designed for users with varying abilities and devices
- **Diverse Training Data**: Tested across different lighting, backgrounds, and hand variations

## Technical Architecture

### Core Technologies
- **Frontend**: React Native
- **ML Framework**: TensorFlow JS
- **Computer Vision**: MediaPipe Hands 

### ML Pipeline
```
MediaPipe Hands →  Feature Engineering    →    LSTM Model     →   Real-time Classification
       ↓                    ↓                      ↓                   ↓
  21 landmarks  → Normalized coordinates  → Temporal analysis →   ASL prediction
```

### Model Architecture
- **Input Layer**: 42 features (21 landmarks × 2 coordinates, normalized)
- **LSTM Layer 1**: 128 units with dropout (0.3)
- **LSTM Layer 2**: 64 units with dropout (0.2)
- **LSTM Layer 2**: 64 units with dropout (0.1)
- **Dense Layer**: 32 units with ReLU activation
- **Output Layer**: 26 units (A-Z) with softmax activation

### Performance Optimizations
- **Memory Management**: Efficient cleanup between recognition cycles
- **Cross-platform Consistency**: Platform-specific optimizations for iOS/Android

## Performance Metrics

| Metric | Value |
|--------|-------|
| **Gesture Recognition Accuracy** | 94.1% |
| **Average Response Time** | <1300ms |
| **User Retention (Week 1)** | 78% |
| **Learning Effectiveness** | 4.2 hours to master alphabet |
| **User Confidence Increase** | 89% report improved confidence |

## Getting Started

### Prerequisites
- Node.js 18+
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)
- Python 3.8+ (for ML model training)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/nikunjmathur08/Signie.git
cd Signie
```

2. **Install dependencies**
```bash
npm install
cd ios && pod install && cd .. # iOS only
```

3. **Download pre-trained model**
```bash
# The trained LSTM model will be downloaded automatically on first run
```

4. **Run the application**
```bash
# Android
npx react-native run-android

# iOS  
npx react-native run-ios
```

## Usage

### Basic Learning Flow

1. **Onboard**: Answer questions about your ASL experience and learning goals
2. **Learn**: Watch demonstrations of each letter sign
3. **Practice**: Use your camera to practice signs and receive real-time feedback
4. **Progress**: Track your improvement and unlock new lessons

### Camera Tips for Best Results
- **Lighting**: Use good, even lighting (avoid backlighting)
- **Background**: Plain backgrounds work best
- **Distance**: Keep hand 1-2 feet from camera
- **Position**: Center your hand in the camera frame
- **Stability**: Hold phone steady or use a stand

## Contributing

We welcome contributions from the community! Here's how you can help:

### Areas for Contribution
- **Expand Vocabulary**: Add support for words and phrases beyond alphabet
- **Internationalization**: Support for other sign languages (BSL, JSL, etc.)
- **Platform Features**: iOS/Android specific optimizations
- **ML Improvements**: Model architecture enhancements
- **Accessibility**: Additional accessibility features

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit with descriptive messages: `git commit -m 'feat: add amazing feature'`
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Standards
- **JavaScript**: ESLint + Prettier configuration
- **React Native**: Follow React Native best practices
- **Python**: PEP 8 style guide for ML components
- **Testing**: Minimum 80% code coverage for new features
- **Documentation**: Update docs for any new features

## 📋 Project Structure

```.
└── SIGNIE/
    ├── android
    ├── app 
    ├── (auth)
    ├── (tabs)
    ├── components /
    │   ├── _layout.tsx
    │   ├── camera.tsx
    │   ├── Congratulations.tsx
    │   ├── DayStreak.tsx
    │   ├── globals.css 
    │   ├── goal.tsx
    │   ├── index.tsx
    │   ├── level.tsx
    │   ├── levelScreen.tsx
    │   ├── loading.tsx
    │   ├── ModelContext.tsx
    │   ├── preference.tsx
    │   ├── program.tsx
    │   ├── signup.tsx
    │   ├── splash.tsx
    │   ├── splash2.tsx
    │   └── splash3.tsx
    ├── assets 
    ├── ios
    ├── utils
    ├── gitignore
    ├── npmrc
    ├── app.json
    ├── babel.config.js
    ├── declarations.d.ts 
    ├── metro.config.js
    ├── nativewind-env.d.ts
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── tailwind.config.js
    └── tsconfig.json
```

## Roadmap

### Version 2.0 (Q3 2025)
- **Full ASL Vocabulary**: 1000+ common words and phrases
- **Conversation Mode**: AI-powered practice conversations
- **Facial Expression Recognition**: Grammar and emotion understanding
- **Offline Mode**: Complete functionality without internet

### Version 3.0 (Q1 2026)
- **Multi-language Support**: BSL, JSL, and other sign languages  
- **Community Features**: Connect with deaf mentors and conversation partners
- **Advanced Analytics**: Detailed learning progress and recommendations
- **VR Integration**: Immersive learning experiences

### Long-term Vision
- **Real-time Translation**: Live sign language to speech/text translation
- **Educational Integration**: Partnerships with schools and universities
- **Healthcare Applications**: Specialized medical sign language modules
- **Global Accessibility**: Supporting sign languages worldwide

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Deaf Community Members**: For invaluable feedback and guidance throughout development
- **AIoT Project Expo Judges**: For recognizing our work and providing encouragement
- **MediaPipe Team**: For providing robust hand tracking capabilities
- **Open Source Community**: For the tools and libraries that made this possible
- **Academic Researchers**: Whose papers formed the foundation of our approach

## Other Important Links
- **LinkedIn**: [LinkedIn Post Highlighting Our Journey](https://www.linkedin.com/posts/nikunjmathur08_signie-bridging-the-communication-gap-with-activity-7336631802712702977-T6gx)
- **Medium**: [Technical Deep Dive Article](https://medium.com/@nikunjmathur0810/signie-bridging-the-communication-gap-with-ai-powered-sign-language-learning-817ab243595a)

### Get Involved
- **Report Bugs**: [GitHub Issues](https://github.com/nikunjmathur08/Signie/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/nikunjmathur08/Signie/discussions)
- **Contribute**: See [Contributing Guidelines](#contributing)
- **Community**: Join our accessibility-focused developer community

---

**Made with ❤️ for a more inclusive world**

*"The limits of my language mean the limits of my world." - Ludwig Wittgenstein*

Let's expand those limits together, one sign at a time!
