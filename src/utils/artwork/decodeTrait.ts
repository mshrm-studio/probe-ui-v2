import { DecodedTrait, EncodedTrait } from './types';
import { parseHex } from './parseHex';
import { rleDecode } from './rleDecode';
import { unpackBoundedColorIndexes } from './unpackBoundedColorIndexes';

export const decodeTrait = (
    encoded: EncodedTrait,
    width: number,
    height: number
): DecodedTrait => {
    const paletteIndex = parseHex(encoded.substring(2, 4));
    const top = parseHex(encoded.substring(4, 6));
    const right = parseHex(encoded.substring(6, 8)) - 1;
    const bottom = parseHex(encoded.substring(8, 10));
    const left = parseHex(encoded.substring(10, 12));
    const boundedPixels = rleDecode(encoded.substring(12));

    const colorIndexes = unpackBoundedColorIndexes(
        {
            boundedColorIndexes: boundedPixels,
            bounds: { top, right, bottom, left },
        },
        width,
        height
    );

    return {
        paletteIndex,
        width,
        height,
        colorIndexes: colorIndexes,
    };
};
