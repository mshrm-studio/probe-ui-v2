import NounFromSubgraph from '@/utils/dto/Noun/FromSubgraph';

export default interface NounProposalCandidateSignatureDelegateFromSubgraph {
    id: string;
    delegatedVotes: string;
    delegatedVotesRaw: string;
    nounsRepresented: NounFromSubgraph[];
    tokenHoldersRepresentedAmount: number;
}

export const isNounProposalCandidateSignatureDelegateFromSubgraph = (
    input: unknown
): input is NounProposalCandidateSignatureDelegateFromSubgraph => {
    return (
        typeof input === 'object' &&
        input !== null &&
        'nounsRepresented' in input
    );
};

export const isNounProposalCandidateSignatureDelegateFromSubgraphList = (
    input: unknown
): input is NounProposalCandidateSignatureDelegateFromSubgraph[] => {
    return (
        Array.isArray(input) &&
        input.every((item) =>
            isNounProposalCandidateSignatureDelegateFromSubgraph(item)
        )
    );
};
