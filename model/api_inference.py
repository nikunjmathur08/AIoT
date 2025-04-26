import io
import numpy as np
import cv2
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from model.keypoint_classifier.keypoint_classifier import KeyPointClassifier
from model.point_history_classifier.point_history_classifier import PointHistoryClassifier
import mediapipe as mp

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mp_hands = mp.solutions.hands
keypoint_classifier = KeyPointClassifier()
point_history_classifier = PointHistoryClassifier()

@app.post("/predict-sign/")
async def predict_sign(file: UploadFile = File(...)):
    contents = await file.read()
    image = cv2.imdecode(np.frombuffer(contents, np.uint8), cv2.IMREAD_COLOR)
    if image is None:
        return {"success": False, "error": "Invalid image"}
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    hands = mp_hands.Hands(static_image_mode=True, max_num_hands=1, min_detection_confidence=0.7)
    results = hands.process(image)
    if results.multi_hand_landmarks is None:
        return {"success": False, "error": "No hand detected"}
    for hand_landmarks in results.multi_hand_landmarks:
        landmark_list = []
        h, w, _ = image.shape
        for lm in hand_landmarks.landmark:
            landmark_list.append([int(lm.x * w), int(lm.y * h)])
        # Preprocess landmarks (relative coordinates, normalization)
        base_x, base_y = landmark_list[0][0], landmark_list[0][1]
        rel_landmarks = [[x - base_x, y - base_y] for x, y in landmark_list]
        flat_landmarks = np.array(rel_landmarks).flatten()
        max_value = np.max(np.abs(flat_landmarks))
        if max_value == 0:
            norm_landmarks = flat_landmarks
        else:
            norm_landmarks = flat_landmarks / max_value
        norm_landmarks = norm_landmarks.tolist()
        sign_id = keypoint_classifier(norm_landmarks)
        return {"success": True, "sign_id": int(sign_id)}
    return {"success": False, "error": "No hand detected"}