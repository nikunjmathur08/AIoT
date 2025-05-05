import cv2
import mediapipe as mp

print("OpenCV version:", cv2.__version__)
print("MediaPipe imports successfully")

# Test camera
cap = cv2.VideoCapture(0)
ret, frame = cap.read()
print("Camera access:", "Success" if ret else "Failed")
cap.release()

# Test MediaPipe hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands()
print("MediaPipe hands initialized successfully")