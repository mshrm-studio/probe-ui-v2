import { createClient, gql } from 'urql';
import { cacheExchange, fetchExchange } from '@urql/core';
import { NextRequest, NextResponse } from 'next/server';
import { isNounProposalFromSubgraph } from '@/utils/dto/Noun/Proposal/FromSubgraph';

const client = createClient({
    url: `${process.env.SUBGRAPH_BASE_URL}/${process.env.SUBGRAPH_API_KEY}/subgraphs/id/${process.env.NOUNS_SUBGRAPH_ID}`,
    exchanges: [cacheExchange, fetchExchange],
});

export async function GET(req: NextRequest): Promise<NextResponse> {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const DATA_QUERY = gql`
        query Proposal($id: ID!) {
            proposal(id: $id) {
                clientId
                description
                proposer {
                    id
                }
                abstainVotes
                againstVotes
                proposalThreshold
                quorumVotes
                quorumCoefficient
                totalSupply
                adjustedTotalSupply
                forVotes
                id
                title
                targets
                status
                vetoedTimestamp
                votes {
                    clientId
                    id
                    reason
                    support
                    supportDetailed
                    voter {
                        id
                        delegatedVotes
                        tokenHoldersRepresentedAmount
                    }
                }
                values
                maxQuorumVotesBPS
                minQuorumVotesBPS
                executionETA
                executedTimestamp
                calldatas
                endBlock
                createdBlock
                createdTimestamp
                createdTransactionHash
                executedBlock
                lastUpdatedBlock
                lastUpdatedTimestamp
                objectionPeriodEndBlock
                onTimelockV1
                signatures
                queuedBlock
                queuedTimestamp
                startBlock
                updatePeriodEndBlock
                vetoedBlock
                voteSnapshotBlock
            }
        }
    `;

    try {
        const result = await client.query(DATA_QUERY, { id }).toPromise();

        if (result.error) {
            return NextResponse.json(
                { error: result.error.message },
                { status: 500 }
            );
        }

        if (!isNounProposalFromSubgraph(result.data.proposal)) {
            return NextResponse.json(
                { error: 'Invalid data' },
                { status: 500 }
            );
        }

        return NextResponse.json({ result });
    } catch (error) {
        console.log('Proposal error:', error);
        return NextResponse.json(error, { status: 500 });
    }
}
