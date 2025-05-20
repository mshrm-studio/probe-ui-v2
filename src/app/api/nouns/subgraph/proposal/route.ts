import { gql } from 'urql';
import { NextRequest, NextResponse } from 'next/server';
import { urqlClient } from '@/utils/lib/urqlClient';
import { isNounProposalFromSubgraph } from '@/utils/dto/Noun/Proposal/FromSubgraph';

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
        const result = await urqlClient.query(DATA_QUERY, { id }).toPromise();

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

        const response = NextResponse.json({ result });
        response.headers.set('Cache-Control', 'no-store');
        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json(error, { status: 500 });
    }
}
