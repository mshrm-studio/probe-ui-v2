import NounFromSubgraph, {
    isNounFromSubgraph,
} from '@/utils/dto/Noun/FromSubgraph';

export interface Bidder {
    id: string; // EG 0xf6b6f07862a02c85628b3a9688beae07fea9c863
}

export interface Bid {
    amount: string;
    bidder: {
        id: string;
    };
    blockTimestamp: string; // EG 1689395795
    clientId: number | null; // EG 9
}

export default interface AuctionFromSubgraph {
    amount?: string; // EG 26120000000000000000
    bidder?: Bidder;
    bids?: Bid[];
    clientId: number | null;
    endTime: string; // EG 1684187639
    noun: NounFromSubgraph;
    settled: boolean;
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
