import NounFromSubgraph from '@/utils/dto/Noun/FromSubgraph';

export default interface NounProposalCandidateSignatureSignerFromSubgraph {
    id: string;
    delegatedVotes: string;
    delegatedVotesRaw: string;
    nounsRepresented: NounFromSubgraph[];
    tokenHoldersRepresentedAmount: number;
}

export const isNounProposalCandidateSignatureSignerFromSubgraph = (
    input: unknown
): input is NounProposalCandidateSignatureSignerFromSubgraph => {
    return (
        typeof input === 'object' &&
        input !== null &&
        'nounsRepresented' in input
    );
};

export const isNounProposalCandidateSignatureSignerFromSubgraphList = (
    input: unknown
): input is NounProposalCandidateSignatureSignerFromSubgraph[] => {
    return (
        Array.isArray(input) &&
        input.every((item) =>
            isNounProposalCandidateSignatureSignerFromSubgraph(item)
        )
    );
};
