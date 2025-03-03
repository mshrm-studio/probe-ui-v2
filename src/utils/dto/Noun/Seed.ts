export default interface NounSeed {
    accessory: number;
    background: number;
    body: number;
    glasses: number;
    head: number;
}

export const isNounSeed = (input: unknown): input is NounSeed => {
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

export const isNounSeedList = (input: unknown): input is NounSeed[] => {
    return Array.isArray(input) && input.every((item) => isNounSeed(item));
};
