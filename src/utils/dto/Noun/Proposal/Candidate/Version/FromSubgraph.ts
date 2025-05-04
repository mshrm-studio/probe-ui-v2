import NounProposalCandidateContent from '@/utils/dto/Noun/Proposal/Candidate/Content/FromSubgraph';

export default interface NounProposalCandidateVersionFromSubgraph {
    createdBlock: string; // EG "8234426"
    createdTimestamp: string; // EG "1746118248"
    id: string; // EG "0x1b65cd50b19479cfe9ad662c4bc25c0c1aba99748692ca91bd71ce9a48b17481-98"
    content: NounProposalCandidateContent;
}

export const isNounProposalCandidateVersionFromSubgraph = (
    input: unknown
): input is NounProposalCandidateVersionFromSubgraph => {
    return (
        typeof input === 'object' &&
        input !== null &&
        'content' in input &&
        'id' in input
    );
};

export const isNounProposalCandidateVersionFromSubgraphList = (
    input: unknown
): input is NounProposalCandidateVersionFromSubgraph[] => {
    return (
        Array.isArray(input) &&
        input.every((item) => isNounProposalCandidateVersionFromSubgraph(item))
    );
};
