from PIL import Image
import os

def create_favicon(source_image_path, output_dir):
    """
    Creates a favicon.ico file from a source image.
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    try:
        img = Image.open(source_image_path)
        img.save(os.path.join(output_dir, 'favicon.ico'), format='ICO', sizes=[(32, 32)])
        print("favicon.ico created successfully!")
    except Exception as e:
        print(f"Error creating favicon: {e}")

if __name__ == "__main__":
    source_image = "public/logo.jpg"
    output_directory = "public"
    create_favicon(source_image, output_directory)