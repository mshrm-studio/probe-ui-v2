import { useEffect, useState } from 'react';

const useImageBitmap = (
    canvas?: HTMLCanvasElement | null,
    source?: File | string | null
) => {
    const [bitmap, setBitmap] = useState<ImageBitmap | null>(null);

    useEffect(() => {
        if (!canvas || !source) return;

        /** Turn the provided source into a data URL we can feed to <img>. */
        const getDataUrl = () =>
            typeof source === 'string'
                ? source // already a URL
                : new Promise<string>((resolve, reject) => {
                      const reader = new FileReader();
                      reader.onerror = () => reject(reader.error);
                      reader.onload = () => resolve(reader.result as string);
                      reader.readAsDataURL(source);
                  });

        (async () => {
            try {
                const imgSrc = await getDataUrl();

                const img = new Image();
                img.crossOrigin = 'anonymous'; // allow CORS DO Spaces

                img.onload = async () => {
                    const ctx = canvas.getContext('2d');
                    if (!ctx) return;

                    ctx.imageSmoothingEnabled = false;
                    ctx.clearRect(0, 0, 32, 32);
                    ctx.drawImage(img, 0, 0, 32, 32);

                    const bmp = await createImageBitmap(
                        ctx.getImageData(0, 0, 32, 32)
                    );
                    setBitmap(bmp);
                };

                img.src = imgSrc;
            } catch (err) {
                console.error('Failed to create bitmap:', err);
                setBitmap(null);
            }
        })();
    }, [canvas, source]);

    return bitmap;
};

export default useImageBitmap;
