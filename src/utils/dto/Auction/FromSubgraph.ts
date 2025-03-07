import NounFromSubgraph, {
    isNounFromSubgraph,
} from '@/utils/dto/Noun/FromSubgraph';

export default interface AuctionFromSubgraph {
    endTime: string;
    noun: NounFromSubgraph;
}

export const isAuctionFromSubgraph = (
    input: unknown
): input is AuctionFromSubgraph => {
    return (
        typeof input === 'object' &&
        input !== null &&
        'endTime' in input &&
        'noun' in input &&
        isNounFromSubgraph(input.noun)
    );
};

export const isAuctionFromSubgraphList = (
    input: unknown
): input is AuctionFromSubgraph[] => {
    return (
        Array.isArray(input) &&
        input.every((item) => isAuctionFromSubgraph(item))
    );
};
