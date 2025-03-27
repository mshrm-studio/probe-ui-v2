import { useEffect, useState } from 'react';

const useImageBitmap = (
    canvas?: HTMLCanvasElement | null,
    file?: File | null
) => {
    const [bitmap, setBitmap] = useState<ImageBitmap | null>(null);

    useEffect(() => {
        if (!canvas || !file) return;

        const reader = new FileReader();

        reader.onload = () => {
            const img = new Image();

            img.onload = async () => {
                const ctx = canvas.getContext('2d');

                if (!ctx) return;

                ctx.imageSmoothingEnabled = false;
                ctx.clearRect(0, 0, 32, 32); // Clear the canvas
                ctx.drawImage(img, 0, 0, 32, 32);

                // Generate the bitmap
                const bitmap = await createImageBitmap(
                    ctx.getImageData(0, 0, 32, 32)
                );

                setBitmap(bitmap); // Store the bitmap
            };

            img.src = reader.result as string;
        };

        reader.readAsDataURL(file);
    }, [canvas, file]);

    return bitmap;
};

export default useImageBitmap;
