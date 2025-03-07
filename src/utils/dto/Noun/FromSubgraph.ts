import NounSeed, { isNounSeed } from '@/utils/dto/Noun/Seed';

export default interface NounFromSubgraph {
    id: string;
    seed: NounSeed;
}

export const isNounFromSubgraph = (
    input: unknown
): input is NounFromSubgraph => {
    return (
        typeof input === 'object' &&
        input !== null &&
        'id' in input &&
        'seed' in input &&
        isNounSeed(input.seed)
    );
};

export const isNounFromSubgraphList = (
    input: unknown
): input is NounFromSubgraph[] => {
    return (
        Array.isArray(input) && input.every((item) => isNounFromSubgraph(item))
    );
};
