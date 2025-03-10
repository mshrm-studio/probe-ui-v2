import { gql } from 'urql';

export const FETCH_AUCTION = gql`
    query FetchAuction($id: ID!) {
        auction(id: $id) {
            amount
            clientId
            settled
            endTime
            noun {
                id
                owner {
                    id
                }
                seed {
                    accessory
                    background
                    body
                    glasses
                    head
                }
            }
            bids(orderBy: amount, first: 100) {
                amount
                bidder {
                    id
                }
                clientId
            }
            bidder {
                id
            }
        }
    }
`;
