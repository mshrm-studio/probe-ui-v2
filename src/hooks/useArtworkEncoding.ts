import {
    bytesToHex,
    decodeAbiParameters,
    encodeAbiParameters,
    hexToBytes,
} from 'viem';
import { colord } from 'colord';
import { chunk } from 'remeda';
import pako from 'pako';
import { HexColor, Palette } from '@/utils/artwork/types';

const TRANSPARENT_HEX = '#00000000';

const TRANSPARENT_INDEX = 0;

type BoundedPixels = {
    bounds: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    pixels: ColorIndex[];
};

type ColorIndex = number;

type EncodedArtwork = `0x${string}`;

export type EncodedCompressedParts = [
    encodedCompressedArtwork: EncodedArtwork,
    originalLength: bigint,
    itemCount: bigint
];

type DecodedArtwork = {
    paletteIndex: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
    pixels: number[];
};

const useArtworkEncoding = () => {
    const compressAndEncodeTrait = (
        traitColorIndexes: number[],
        paletteIndex: number
    ): EncodedCompressedParts => {
        return compressEncodedArtwork([
            encodeArtwork(32, 32, traitColorIndexes, paletteIndex),
        ]);
    };

    const compressEncodedArtwork = (
        encodedArtwork: EncodedArtwork[]
    ): EncodedCompressedParts => {
        const abiEncodedArtwork = encodeAbiParameters(
            [{ type: 'bytes[]' }],
            [encodedArtwork]
        );
        const uncompressedBytes = hexToBytes(abiEncodedArtwork);
        const compressedBytes = pako.deflateRaw(uncompressedBytes);
        const encodedCompressedArtwork = bytesToHex(compressedBytes);
        const originalLength = BigInt(uncompressedBytes.length);
        const itemCount = BigInt(encodedArtwork.length);

        return [encodedCompressedArtwork, originalLength, itemCount];
    };

    const decodeArtwork = (encoded: EncodedArtwork): DecodedArtwork => {
        const hexData = encoded.startsWith('0x') ? encoded.slice(2) : encoded;

        const paletteIndex = parseInt(hexData.slice(0, 2), 16);
        const top = parseInt(hexData.slice(2, 4), 16);
        const right = parseInt(hexData.slice(4, 6), 16);
        const bottom = parseInt(hexData.slice(6, 8), 16);
        const left = parseInt(hexData.slice(8, 10), 16);

        const rleData = hexData.slice(10);

        const pixels = [];
        for (let i = 0; i < rleData.length; i += 4) {
            const countHex = rleData.slice(i, i + 2);
            const colorHex = rleData.slice(i + 2, i + 4);
            const count = parseInt(countHex, 16);
            const colorIndex = parseInt(colorHex, 16);

            for (let j = 0; j < count; j++) {
                pixels.push(colorIndex);
            }
        }

        return { paletteIndex, top, right, bottom, left, pixels };
    };

    const decimalToHex = (decimal: number) =>
        decimal.toString(16).padStart(2, '0');

    const encodeArtwork = (
        height: number,
        width: number,
        pixels: number[],
        paletteIndex: number
    ): EncodedArtwork => {
        const {
            bounds: { top, right, bottom, left },
            pixels: boundedPixels,
        } = packToBoundedPixels(pixels, width, height);

        const metadata = [paletteIndex, top, right, bottom, left].map((v) =>
            toHexByte(v)
        );

        return `0x${metadata.join('')}${rleEncode(boundedPixels)}`;
    };

    const getColorIndexes = (canvas: HTMLCanvasElement, palette: Palette) => {
        const paletteDict = getPaletteDict(palette);

        return getPixels(canvas).map((color) => {
            return (
                paletteDict[color.toHex().toLowerCase()] ?? TRANSPARENT_INDEX
            );
        });
    };

    const getPaletteDict = (palette: Palette) =>
        palette.reduce(
            (lookup, color, index) => ({
                ...lookup,
                [color.toLowerCase()]: index,
            }),
            {} as Record<string, number>
        );

    const getPaletteIndex = (colors?: HexColor[], palettes?: Palette[]) => {
        if (!colors || !palettes) return null;

        const normalisedColors = colors.map((color) =>
            color.startsWith('#') ? color : `#${color}`
        );

        const normalisedPalettes = palettes.map((palette) =>
            palette.map((color) =>
                color.startsWith('#') ? color : `#${color}`
            )
        );

        for (let i = 0; i < normalisedPalettes.length; i++) {
            const palette = normalisedPalettes[i];

            if (normalisedColors.every((color) => palette.includes(color)))
                return i;
        }

        return null;
    };

    const getPixels = (canvas: HTMLCanvasElement) =>
        chunk(
            [
                ...canvas
                    .getContext('2d')!
                    .getImageData(0, 0, canvas.width, canvas.height).data,
            ],
            4
        ).map(([r, g, b, a]) =>
            colord({
                r,
                g: g as number,
                b: b as number,
                a: Math.floor((a as number) / 255),
            })
        );

    const getTraitColors = (
        traitBitmap: ImageBitmap
    ): HexColor[] | undefined => {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(traitBitmap, 0, 0, 32, 32);
        const imageData = ctx.getImageData(0, 0, 32, 32);
        const traitColors = [
            ...new Set(
                Array.from(
                    { length: 32 * 32 },
                    (_, i) =>
                        [
                            imageData.data[i * 4],
                            imageData.data[i * 4 + 1],
                            imageData.data[i * 4 + 2],
                            imageData.data[i * 4 + 3],
                        ] as [number, number, number, number]
                )
                    .map(rgbaToHex)
                    .filter((color) => color !== TRANSPARENT_HEX)
            ),
        ];

        return traitColors;
    };

    const packToBoundedPixels = (
        pixels: ColorIndex[],
        width: number,
        height: number
    ): BoundedPixels => {
        let top = height - 1;
        let right = 0;
        let bottom = 0;
        let left = width - 1;
        const rows: number[][] = new Array(height).fill(null).map(() => []);

        for (const [i, pixel] of pixels.entries()) {
            const row = Math.floor(i / width);
            const col = i % width;
            const isTransparent = pixel === TRANSPARENT_INDEX;

            rows[row].push(pixel);

            if (!isTransparent) {
                top = Math.min(top, row);
                right = Math.max(right, col);
                bottom = Math.max(bottom, row);
                left = Math.min(left, col);
            }
        }

        const boundedPixels = rows
            .slice(top, bottom + 1)
            .flatMap((row) => row.slice(left, right + 1));

        // right bound is calculated to be one pixel outside the content
        right++;

        return {
            bounds: {
                top,
                right,
                bottom,
                left,
            },
            pixels: boundedPixels,
        };
    };

    const unboundPixels = (
        boundedPixels: number[],
        {
            top,
            right,
            bottom,
            left,
        }: Pick<DecodedArtwork, 'top' | 'right' | 'bottom' | 'left'>,
        width: number,
        height: number
    ): number[] => {
        const output = new Array(width * height).fill(0);
        const boundedWidth = right - left;
        const boundedHeight = bottom - top + 1;

        for (let row = 0; row < boundedHeight; row++) {
            for (let col = 0; col < boundedWidth; col++) {
                const pixelIndex = row * boundedWidth + col;
                const fullRow = top + row;
                const fullCol = left + col;
                output[fullRow * width + fullCol] = boundedPixels[pixelIndex];
            }
        }

        return output;
    };

    const rgbaToHex = ([r, g, b, a]: [
        number,
        number,
        number,
        number
    ]): HexColor =>
        a === 0 ? TRANSPARENT_HEX : `#${[r, g, b].map(decimalToHex).join('')}`;

    const rleEncode = (boundedPixels: number[]) => {
        const encoding: string[] = [];
        let previousColorIndex = boundedPixels[0];
        let colorStreakCount = 1;

        for (let i = 1; i < boundedPixels.length; i++) {
            if (
                boundedPixels[i] !== previousColorIndex ||
                colorStreakCount === 255
            ) {
                encoding.push(
                    toHexByte(colorStreakCount),
                    toHexByte(previousColorIndex)
                );

                colorStreakCount = 1;

                previousColorIndex = boundedPixels[i];
            } else {
                colorStreakCount++;
            }
        }

        if (previousColorIndex !== undefined) {
            encoding.push(
                toHexByte(colorStreakCount),
                toHexByte(previousColorIndex)
            );
        }

        return encoding.join('');
    };

    const toHexByte = (n: number): string => n.toString(16).padStart(2, '0');

    const verifyTrait = (
        originalPixels: number[],
        [
            encodedCompressedArtwork,
            originalLength,
            itemCount,
        ]: EncodedCompressedParts
    ) => {
        const compressedBytes = hexToBytes(encodedCompressedArtwork);
        const decompressedBytes = pako.inflateRaw(compressedBytes);

        if (BigInt(decompressedBytes.length) !== originalLength) {
            throw new Error(
                'Decompressed length does not match `originalLength`'
            );
        }

        const [decodedBytesArray] = decodeAbiParameters(
            [{ type: 'bytes[]' }],
            decompressedBytes
        ) as [`0x${string}`[]];

        if (BigInt(decodedBytesArray.length) !== itemCount) {
            throw new Error(
                'Decoded artwork item count does not match `itemCount`'
            );
        }

        for (let i = 0; i < decodedBytesArray.length; i++) {
            const decoded = decodeArtwork(decodedBytesArray[i]);
            const unbounded = unboundPixels(decoded.pixels, decoded, 32, 32);

            const isSame = unbounded.every(
                (val, idx) => val === originalPixels[idx]
            );

            if (!isSame) {
                throw new Error(
                    `Decoded pixel array does not match the original at index ${i}`
                );
            }
        }

        return true;
    };

    return {
        compressAndEncodeTrait,
        compressEncodedArtwork,
        encodeArtwork,
        getColorIndexes,
        getPaletteIndex,
        getTraitColors,
        rleEncode,
        verifyTrait,
    };
};

export default useArtworkEncoding;
