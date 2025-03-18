import LilSeed, { isLilSeed } from '@/utils/dto/Lil/Seed';

export default interface LilFromSubgraph {
    id: string;
    seed: LilSeed;
    owner?: {
        id: string;
    };
}

export const isLilFromSubgraph = (input: unknown): input is LilFromSubgraph => {
    return (
        typeof input === 'object' &&
        input !== null &&
        'id' in input &&
        'seed' in input &&
        isLilSeed(input.seed)
    );
};

export const isLilFromSubgraphList = (
    input: unknown
): input is LilFromSubgraph[] => {
    return (
        Array.isArray(input) && input.every((item) => isLilFromSubgraph(item))
    );
};
