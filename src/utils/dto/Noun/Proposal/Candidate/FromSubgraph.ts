import NounProposalCandidateVersionFromSubgraph from '@/utils/dto/Noun/Proposal/Candidate/Version/FromSubgraph';

export default interface NounProposalCandidateFromSubgraph {
    canceled: boolean;
    canceledBlock: boolean | null;
    canceledTimestamp: string | null;
    createdBlock: string; // EG "8234426"
    createdTimestamp: string; // EG "1746118248"
    createdTransactionHash: string; // EG "0x1b65cd50b19479cfe9ad662c4bc25c0c1aba99748692ca91bd71ce9a48b17481"
    id: string; // EG "0xf193c62bf66a2da6f4fa5cacad6f75dcf7d7fa96-probe-dream-70"
    lastUpdatedBlock: string; // EG "8234426"
    lastUpdatedTimestamp: string; // EG "1746118248"
    number: string; // EG "315"
    proposer: string; // EG "0xf193c62bf66a2da6f4fa5cacad6f75dcf7d7fa96"
    slug: string; // EG "probe-dream-70"
    latestVersion: NounProposalCandidateVersionFromSubgraph;
}

export const isNounProposalCandidateFromSubgraph = (
    input: unknown
): input is NounProposalCandidateFromSubgraph => {
    return (
        typeof input === 'object' &&
        input !== null &&
        'proposer' in input &&
        'slug' in input
    );
};

export const isNounProposalCandidateFromSubgraphList = (
    input: unknown
): input is NounProposalCandidateFromSubgraph[] => {
    return (
        Array.isArray(input) &&
        input.every((item) => isNounProposalCandidateFromSubgraph(item))
    );
};
