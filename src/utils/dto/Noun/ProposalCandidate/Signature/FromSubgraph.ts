import NounProposalCandidateSignatureDelegateFromSubgraph from '@/utils/dto/Noun/ProposalCandidate/Signature/Delegate/FromSubgraph';

export default interface NounProposalCandidateSignatureFromSubgraph {
    id: string;
    signer: NounProposalCandidateSignatureDelegateFromSubgraph;
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
