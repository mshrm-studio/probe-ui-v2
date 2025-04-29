import { gql } from 'urql';

export const FETCH_PROPOSAL_CANDIDATE = gql`
    query FetchProposalCandidate($id: ID!) {
        proposalCandidate(id: $id) {
            createdTimestamp
            number
            proposer
            slug
        }
    }
`;
