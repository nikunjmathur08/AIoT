import os
import glob

def find_model_files():
    # Check current directory
    print(f"Current working directory: {os.getcwd()}")
    
    # Look for model files with different extensions
    base_path = "model/keypoint_classifier"
    
    # Check if directory exists
    if not os.path.exists(base_path):
        print(f"Directory {base_path} doesn't exist!")
        return
    
    # List all files in the directory
    print(f"All files in {base_path}:")
    all_files = os.listdir(base_path)
    for file in all_files:
        print(f"  - {file}")
    
    # Look for specific model files
    model_files = (
        glob.glob(f"{base_path}/*.keras") + 
        glob.glob(f"{base_path}/*.h5") + 
        glob.glob(f"{base_path}/*.tflite")
    )
    
    if model_files:
        print("\nFound model files:")
        for file in model_files:
            print(f"  - {file}")
    else:
        print("\nNo .keras, .h5 or .tflite files found")
        
    # Check if SavedModel directory exists
    saved_model_dirs = [d for d in os.listdir(base_path) 
                       if os.path.isdir(os.path.join(base_path, d))]
    if saved_model_dirs:
        print("\nPotential SavedModel directories:")
        for dir in saved_model_dirs:
            dir_path = os.path.join(base_path, dir)
            if os.path.exists(os.path.join(dir_path, "saved_model.pb")):
                print(f"  - {dir_path} (confirmed SavedModel)")
            else:
                print(f"  - {dir_path}")

if __name__ == "__main__":
    find_model_files()