import { ImageData } from '@noundry/nouns-assets';
import { useEffect, useState } from 'react';

// Decode RLE Data Hook
export const useTraitBitmap = (
    layer: 'heads' | 'bodies' | 'accessories' | 'glasses',
    trait: number | ImageBitmap | string // Supports either seed ID, uploaded bitmap or DO storage URL
) => {
    const { images, palette } = ImageData;
    const [bitmap, setBitmap] = useState<ImageBitmap | null>(null);

    useEffect(() => {
        async function loadBitmap() {
            try {
                if (trait === null || trait === undefined) {
                    setBitmap(null);
                    return;
                }

                // If it's already an ImageBitmap (uploaded image), use it directly
                if (trait instanceof ImageBitmap) {
                    setBitmap(trait);
                    return;
                }

                if (typeof trait === 'string') {
                    const response = await fetch(
                        `/api/proxy?url=${encodeURIComponent(trait)}`
                    );

                    const blob = await response.blob();

                    const imageBitmap = await createImageBitmap(blob);

                    setBitmap(imageBitmap);

                    return;
                }

                // Fetch the RLE data from the layer and index
                const image = images[layer][Number(trait)];
                if (!image) {
                    console.error(
                        `[hooks/useTraitBitmap] Trait ${trait} not found in layer ${layer}`
                    );
                    setBitmap(null);
                    return;
                }

                const rle = image.data.replace(/^0x/, ''); // Remove '0x' prefix

                // Decode RLE bounds
                const bounds = {
                    top: parseInt(rle.substring(2, 4), 16),
                    right: parseInt(rle.substring(4, 6), 16),
                    bottom: parseInt(rle.substring(6, 8), 16),
                    left: parseInt(rle.substring(8, 10), 16),
                };

                // Decode pixel data
                const rects =
                    rle
                        .substring(10)
                        .match(/.{1,4}/g) // 4-char groups
                        ?.map((rect) => [
                            parseInt(rect.substring(0, 2), 16), // length
                            parseInt(rect.substring(2, 4), 16), // color index
                        ]) || [];

                // Setup canvas
                const width = 32; // Always 32x32 for Nouns
                const height = 32;
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d')!;

                const imageData = ctx.createImageData(width, height);
                const pixels = imageData.data;

                let x = bounds.left;
                let y = bounds.top;

                // Apply RLE data to pixels
                rects.forEach(([length, colorIndex]) => {
                    if (colorIndex === 0) {
                        // ** Transparent pixel — skip processing **
                        x += length;
                        if (x >= bounds.right) {
                            const overflow = x - bounds.right;
                            x = bounds.left + overflow;
                            y++;
                        }
                        return;
                    }

                    // Get RGB color from palette
                    const hexColor = palette[colorIndex];

                    if (!hexColor) {
                        console.error(
                            `[hooks/useTraitBitmap] Invalid color index ${colorIndex} at ${x},${y}`
                        );
                        return;
                    }

                    const [r, g, b] = [
                        parseInt(hexColor.substring(0, 2), 16),
                        parseInt(hexColor.substring(2, 4), 16),
                        parseInt(hexColor.substring(4, 6), 16),
                    ];

                    for (let i = 0; i < length; i++) {
                        const offset = (y * width + x) * 4;
                        pixels[offset] = r; // Red
                        pixels[offset + 1] = g; // Green
                        pixels[offset + 2] = b; // Blue
                        pixels[offset + 3] = 255; // Alpha (opaque)

                        x++;
                        if (x >= bounds.right) {
                            x = bounds.left;
                            y++;
                        }
                    }
                });

                // Render pixels onto the canvas
                ctx.putImageData(imageData, 0, 0);

                // Convert to ImageBitmap
                const imgBitmap = await createImageBitmap(canvas);

                setBitmap(imgBitmap);
            } catch (error) {
                console.error(error);
                setBitmap(null);
            }
        }

        loadBitmap();
    }, [layer, trait]);

    return bitmap;
};
