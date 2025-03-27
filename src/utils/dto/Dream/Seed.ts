export default interface DreamSeed {
    accessory: number | string | ImageBitmap;
    background: number | string;
    body: number | string | ImageBitmap;
    glasses: number | string | ImageBitmap;
    head: number | string | ImageBitmap;
}

export const isDreamSeed = (input: unknown): input is DreamSeed => {
    return (
        typeof input === 'object' &&
        input !== null &&
        'accessory' in input &&
        'background' in input &&
        'body' in input &&
        'glasses' in input &&
        'head' in input
    );
};

export const isDreamSeedList = (input: unknown): input is DreamSeed[] => {
    return Array.isArray(input) && input.every((item) => isDreamSeed(item));
};
