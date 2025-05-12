import NounDelegateFromSubgraph from '@/utils/dto/Noun/Proposal/DelegateFromSubgraph';

export type ProposalStatus =
    | 'PENDING'
    | 'ACTIVE'
    | 'DEFEATED'
    | 'SUCCEEDED'
    | 'QUEUED'
    | 'EXECUTED'
    | 'CANCELLED'
    | 'VETOED';

export interface Vote {
    id: string;
    voter: NounDelegateFromSubgraph;
    support: number; // 0 = against, 1 = for, 2 = abstain
    weight: string; // BigInt as string
}

export interface ProposalFeedback {
    id: string;
    author: NounDelegateFromSubgraph;
    body: string;
    createdTimestamp: string;
}

export default interface NounProposalFromSubgraph {
    id: string; // ID!
    proposer: NounDelegateFromSubgraph; // Delegate!
    signers?: NounDelegateFromSubgraph[]; // [Delegate!]
    targets: string[]; // [Bytes!]
    values: string[]; // [BigInt!]
    signatures: string[]; // [String!]
    calldatas: string[]; // [Bytes!]
    createdTimestamp: string; // BigInt!
    createdBlock: string; // BigInt!
    lastUpdatedTimestamp: string; // BigInt!
    lastUpdatedBlock: string; // BigInt!
    createdTransactionHash: string; // Bytes!
    startBlock: string; // BigInt!
    endBlock: string; // BigInt!
    proposalThreshold?: string; // BigInt
    quorumVotes?: string; // BigInt
    forVotes: string; // BigInt!
    againstVotes: string; // BigInt!
    abstainVotes: string; // BigInt!
    title: string; // String!
    description: string; // String!
    status?: ProposalStatus; // ProposalStatus
    executionETA?: string; // BigInt
    votes?: Vote[]; // [Vote!]!
    totalSupply: string; // BigInt!
    adjustedTotalSupply: string; // BigInt!
    minQuorumVotesBPS: number; // Int!
    maxQuorumVotesBPS: number; // Int!
    quorumCoefficient: string; // BigInt!
    objectionPeriodEndBlock: string; // BigInt!
    updatePeriodEndBlock?: string; // BigInt
    feedbackPosts?: ProposalFeedback[]; // [ProposalFeedback!]!
    onTimelockV1?: boolean; // Boolean
    voteSnapshotBlock: string; // BigInt!
    canceledBlock?: string; // BigInt
    canceledTimestamp?: string; // BigInt
    executedBlock?: string; // BigInt
    executedTimestamp?: string; // BigInt
    vetoedBlock?: string; // BigInt
    vetoedTimestamp?: string; // BigInt
    queuedBlock?: string; // BigInt
    queuedTimestamp?: string; // BigInt
    clientId: number; // Int!
}

export const isNounProposalFromSubgraph = (
    input: unknown
): input is NounProposalFromSubgraph => {
    return (
        typeof input === 'object' &&
        input !== null &&
        'clientId' in input &&
        'id' in input
    );
};

export const isNounProposalFromSubgraphList = (
    input: unknown
): input is NounProposalFromSubgraph[] => {
    return (
        Array.isArray(input) &&
        input.every((item) => isNounProposalFromSubgraph(item))
    );
};
