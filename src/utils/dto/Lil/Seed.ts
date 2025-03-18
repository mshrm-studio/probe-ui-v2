export default interface LilSeed {
    accessory: number | string;
    background: number | string;
    body: number | string;
    glasses: number | string;
    head: number | string;
}

export const isLilSeed = (input: unknown): input is LilSeed => {
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

export const isLilSeedList = (input: unknown): input is LilSeed[] => {
    return Array.isArray(input) && input.every((item) => isLilSeed(item));
};
