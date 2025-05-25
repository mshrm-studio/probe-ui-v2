export default interface NounProposalFromContract {
    id: BigInt; // ID of the proposal
    proposer: string; // Who created it
    proposalThreshold: BigInt; // Minimum votes required to create
    quorumVotes: BigInt; // Required votes to pass
    eta: BigInt; // Execution time (after queuing)
    startBlock: BigInt; // Block voting starts
    endBlock: BigInt; // Block voting ends
    forVotes: BigInt; // Number of votes in favour
    againstVotes: BigInt; // Number of votes against
    abstainVotes: BigInt; // Number of abstain votes
    canceled: boolean; // Whether proposal was cancelled
    vetoed: boolean; // Whether vetoed
    executed: boolean; // Whether executed
    totalSupply: BigInt; // Total token supply at snapshot
    creationBlock: BigInt; // Block proposal was created
    signers: string[]; // Additional signers for multi-sig proposals
    updatePeriodEndBlock: BigInt; // Block until which updates are allowed
    objectionPeriodEndBlock: BigInt; // Block until objections can be raised
    executeOnTimelockV1: boolean; // Whether execution is routed to timelockV1
}

export const isNounProposalFromContract = (
    input: unknown
): input is NounProposalFromContract => {
    return (
        typeof input === 'object' &&
        input !== null &&
        'proposer' in input &&
        'id' in input
    );
};

export const isNounProposalFromSubgraphList = (
    input: unknown
): input is NounProposalFromContract[] => {
    return (
        Array.isArray(input) &&
        input.every((item) => isNounProposalFromContract(item))
    );
};
