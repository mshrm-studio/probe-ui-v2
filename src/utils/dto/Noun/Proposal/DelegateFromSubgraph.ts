import NounFromSubgraph from '@/utils/dto/Noun/FromSubgraph';

export default interface NounDelegateFromSubgraph {
    id: string;
    delegatedVotes?: string;
    nounsRepresented?: NounFromSubgraph[];
    tokenHoldersRepresentedAmount?: number;
}
