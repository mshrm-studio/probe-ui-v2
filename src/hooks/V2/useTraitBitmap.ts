import { decodeTrait } from '@/utils/artwork/decodeTrait';
import { EncodedTrait, Palette } from '@/utils/artwork/types';
import { ImageData as NounsAssets } from '@noundry/nouns-assets';
import { useEffect, useState } from 'react';
import { colormap } from '@/utils/artwork/colormap';
import { TRANSPARENT_HEX } from '@/utils/artwork/constants';

// Decode RLE Data Hook
export const useTraitBitmap = (
    layer: 'heads' | 'bodies' | 'accessories' | 'glasses',
    trait: number | ImageBitmap | string // Supports either seed ID, uploaded bitmap or DO storage URL
) => {
    const { images, palette } = NounsAssets;
    const [bitmap, setBitmap] = useState<ImageBitmap | null>(null);

    useEffect(() => {
        // console.log(
        //     '[useTraitBitmap] effect firing for:',
        //     layer,
        //     'trait:',
        //     trait,
        //     'time:',
        //     new Date().toISOString()
        // );

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
                    console.error(`Trait ${trait} not found in layer ${layer}`);
                    setBitmap(null);
                    return;
                }

                const { width, height, colorIndexes, paletteIndex } =
                    decodeTrait(image.data as EncodedTrait, 32, 32);

                const normalisedPalette = palette.map((color) =>
                    color == '' ? TRANSPARENT_HEX : `#${color}`
                );

                const { data } = colormap(
                    { width, height, colorIndexes },
                    normalisedPalette as Palette
                );

                const imageData = new ImageData(data, width, height);

                const imgBitmap = await createImageBitmap(imageData);

                setBitmap(imgBitmap);
            } catch (error) {
                console.error('Failed to decode RLE:', error);
                setBitmap(null);
            }
        }

        loadBitmap();
    }, [layer, trait]);

    return bitmap;
};
