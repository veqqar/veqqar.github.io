from PIL import Image

def split_image_vertically(image_path, output_prefix="section3_image", num_sections=20):
    # Abre la imagen
    img = Image.open(image_path)
    width, height = img.size
    
    # Calcula el ancho de cada sección
    section_width = width // num_sections

    # Itera y recorta cada sección
    for i in range(num_sections):
        left = i * section_width
        right = (i + 1) * section_width if i < num_sections - 1 else width  # Asegura que la última sección incluya el resto de la imagen

        # Recorta la sección
        section = img.crop((left, 0, right, height))
        output_filename = f"{output_prefix}_{i + 1}.jpg"
        section.save(output_filename)
        print(f"Guardado: {output_filename}")

# Ejemplo de uso:
split_image_vertically("carrousel__img__3.jpg")
