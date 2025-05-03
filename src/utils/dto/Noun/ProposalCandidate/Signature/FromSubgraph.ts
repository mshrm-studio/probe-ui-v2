import NounProposalCandidateSignatureSignerFromSubgraph from '@/utils/dto/Noun/ProposalCandidate/Signature/Signer/FromSubgraph';

export default interface NounProposalCandidateSignatureFromSubgraph {
    id: string;
    signer: NounProposalCandidateSignatureSignerFromSubgraph;
    createdTimestamp: string;
    sig: string;
    sigDigest: string;
    reason: string;
    expirationTimestamp: string;
    encodedProposalHash: string;
}

export const isNounProposalCandidateSignatureFromSubgraph = (
    input: unknown
): input is NounProposalCandidateSignatureFromSubgraph => {
    return typeof input === 'object' && input !== null && 'signer' in input;
};

export const isNounProposalCandidateSignatureFromSubgraphList = (
    input: unknown
): input is NounProposalCandidateSignatureFromSubgraph[] => {
    return (
        Array.isArray(input) &&
        input.every((item) =>
            isNounProposalCandidateSignatureFromSubgraph(item)
        )
    );
};
