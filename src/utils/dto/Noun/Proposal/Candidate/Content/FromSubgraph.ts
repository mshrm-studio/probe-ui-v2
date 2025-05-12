import NounProposalCandidateSignature from '@/utils/dto/Noun/Proposal/Candidate/Signature/FromSubgraph';

export default interface NounProposalCandidateContentFromSubgraph {
    id: string;
    encodedProposalHash: string; // content ID: "0xcffcc895..."
    description: string;
    title: string;
    proposalIdToUpdate: string; // "0"
    proposer: string; // address
    targets: string[];
    values: string[]; // as stringified BigInts
    signatures: string[];
    calldatas: string[];
    matchingProposalIds: string[]; // []
    contentSignatures: NounProposalCandidateSignature[];
    updateMessage: string;
}

export const isNounProposalCandidateContentFromSubgraph = (
    input: unknown
): input is NounProposalCandidateContentFromSubgraph => {
    return (
        typeof input === 'object' &&
        input !== null &&
        'contentSignatures' in input &&
        'encodedProposalHash' in input
    );
};

export const isNounProposalCandidateContentFromSubgraphList = (
    input: unknown
): input is NounProposalCandidateContentFromSubgraph[] => {
    return (
        Array.isArray(input) &&
        input.every((item) => isNounProposalCandidateContentFromSubgraph(item))
    );
};
