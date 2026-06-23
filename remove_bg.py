import os
import glob
from rembg import remove
from PIL import Image

def process_images():
    print("Starting background removal...")
    public_dir = os.path.join(os.getcwd(), 'public')
    images = glob.glob(os.path.join(public_dir, 'Gemini_Generated_Image_*.png'))
    
    for img_path in images:
        print(f"Processing {os.path.basename(img_path)}...")
        try:
            with open(img_path, 'rb') as f:
                input_data = f.read()
            
            output_data = remove(input_data)
            
            with open(img_path, 'wb') as f:
                f.write(output_data)
            print(f"Successfully removed background from {os.path.basename(img_path)}")
        except Exception as e:
            print(f"Error processing {os.path.basename(img_path)}: {e}")

if __name__ == "__main__":
    process_images()
