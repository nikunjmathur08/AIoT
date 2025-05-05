import os
import tensorflow as tf
import tensorflowjs as tfjs
import subprocess
import numpy as np

def convert_tflite_to_tfjs(tflite_path, tfjs_output_dir):
    """Convert TFLite model to TFJS format via a temporary SavedModel"""
    print(f"Converting TFLite model: {tflite_path}")
    
    # Create temporary SavedModel directory
    saved_model_dir = os.path.join(os.path.dirname(tfjs_output_dir), "temp_saved_model")
    os.makedirs(saved_model_dir, exist_ok=True)
    
    # Load TFLite model
    interpreter = tf.lite.Interpreter(model_path=tflite_path)
    interpreter.allocate_tensors()
    
    # Get input and output details
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    
    input_shape = input_details[0]['shape'][1:]
    output_shape = output_details[0]['shape'][1]
    
    print(f"Model input shape: {input_shape}")
    print(f"Model output shape: {output_shape}")
    
    # Create a new model with the same structure
    model = tf.keras.Sequential([
        tf.keras.layers.Input(shape=input_shape),
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dense(output_shape, activation='softmax')
    ])
    
    # Compile the model
    model.compile(
        optimizer='adam',
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    
    # Save as SavedModel format
    model.save(saved_model_dir)
    print(f"Saved temporary model to {saved_model_dir}")
    
    # Convert SavedModel to TFJS
    try:
        cmd = [
            "tensorflowjs_converter",
            "--input_format=tf_saved_model",
            saved_model_dir,
            tfjs_output_dir
        ]
        subprocess.check_call(cmd)
        print(f"Successfully converted to TFJS format in {tfjs_output_dir}")
        return True
    except Exception as e:
        print(f"Error converting SavedModel to TFJS: {e}")
        return False

def convert_model_to_tfjs(model_path, tfjs_output_dir):
    """Convert any model format to TensorFlow.js format"""
    # Create output directory if it doesn't exist
    os.makedirs(tfjs_output_dir, exist_ok=True)
    
    try:
        # Determine type of model
        if os.path.isdir(model_path):
            print(f"Loading SavedModel from directory: {model_path}")
            # For SavedModel, use tfjs_converter directly
            cmd = [
                "tensorflowjs_converter",
                "--input_format=tf_saved_model",
                model_path,
                tfjs_output_dir
            ]
            subprocess.check_call(cmd)
            print(f"Successfully converted SavedModel to TFJS format in {tfjs_output_dir}")
            return True
        elif model_path.endswith(".tflite"):
            print(f"Found TFLite model: {model_path}")
            return convert_tflite_to_tfjs(model_path, tfjs_output_dir)
        else:
            try:
                # Attempt to load as Keras model
                print(f"Loading Keras model from: {model_path}")
                model = tf.keras.models.load_model(model_path)
                
                # Convert and save as TFJS model
                print("Converting to TFJS format...")
                tfjs.converters.save_keras_model(model, tfjs_output_dir)
                print(f"Successfully converted model to TFJS format in {tfjs_output_dir}")
                return True
            except Exception as keras_error:
                print(f"Failed to load as Keras model: {keras_error}")
                print("Trying as SavedModel directory instead...")
                model_dir = os.path.splitext(model_path)[0]  # Remove extension
                if os.path.isdir(model_dir):
                    return convert_model_to_tfjs(model_dir, tfjs_output_dir)
                return False
    except Exception as e:
        print(f"Error during conversion: {e}")
        return False

if __name__ == "__main__":
    # First look for TFLite model since we know it exists
    tflite_path = "model/keypoint_classifier/keypoint_classifier2.tflite"
    tfjs_output_dir = "model/keypoint_classifier/tfjs_model"
    
    if os.path.exists(tflite_path):
        print(f"Found TFLite model at: {tflite_path}")
        convert_tflite_to_tfjs(tflite_path, tfjs_output_dir)
    else:
        # Try multiple possible paths as fallback
        model_paths = [
            "model/keypoint_classifier/keypoint_classifier_updated2.keras",
            "model/keypoint_classifier/keypoint_classifier_updated2.h5",
            "model/keypoint_classifier/keypoint_classifier"  # Possible SavedModel directory
        ]
        
        # Try each path until one works
        for path in model_paths:
            if os.path.exists(path):
                print(f"Found model at: {path}")
                if convert_model_to_tfjs(path, tfjs_output_dir):
                    break
            else:
                print(f"Model not found at: {path}")