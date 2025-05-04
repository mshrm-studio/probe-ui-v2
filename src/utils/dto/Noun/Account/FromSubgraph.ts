import NounFromSubgraph from '@/utils/dto/Noun/FromSubgraph';
import NounDelegateFromSubgraph from '@/utils/dto/Noun/Proposal/DelegateFromSubgraph';

export default interface NounAccountFromSubgraph {
    id: string;
    delegate?: NounDelegateFromSubgraph;
    tokenBalanceRaw: string;
    tokenBalance: string;
    totalTokensHeldRaw: string;
    totalTokensHeld: string;
    nouns?: NounFromSubgraph[];
}

export const isNounAccountFromSubgraph = (
    input: unknown
): input is NounAccountFromSubgraph => {
    return (
        typeof input === 'object' &&
        input !== null &&
        'id' in input &&
        'tokenBalance' in input
    );
};

export const isNounAccountFromSubgraphList = (
    input: unknown
): input is NounAccountFromSubgraph[] => {
    return (
        Array.isArray(input) &&
        input.every((item) => isNounAccountFromSubgraph(item))
    );
};
