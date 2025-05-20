import { gql } from 'urql';
import { urqlClient } from '@/utils/lib/urqlClient';
import { NextRequest, NextResponse } from 'next/server';
import { isNounProposalCandidateFromSubgraph } from '@/utils/dto/Noun/Proposal/Candidate/FromSubgraph';

export async function GET(req: NextRequest): Promise<NextResponse> {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const DATA_QUERY = gql`
        query ProposalCandidate($id: ID!) {
            proposalCandidate(id: $id) {
                latestVersion {
                    updateMessage
                    createdBlock
                    createdTimestamp
                    id
                    proposal {
                        canceled
                        canceledBlock
                        canceledTimestamp
                        createdBlock
                        createdTimestamp
                        createdTransactionHash
                        id
                        lastUpdatedBlock
                        lastUpdatedTimestamp
                        number
                        proposer
                        slug
                    }
                    content {
                        calldatas
                        description
                        encodedProposalHash
                        id
                        proposalIdToUpdate
                        matchingProposalIds
                        proposer
                        signatures
                        targets
                        title
                        values
                        contentSignatures {
                            createdTimestamp
                            sig
                            signer {
                                delegatedVotes
                                delegatedVotesRaw
                                id
                                nounsRepresented {
                                    id
                                    seed {
                                        accessory
                                        background
                                        body
                                        glasses
                                        head
                                    }
                                }
                                tokenHoldersRepresentedAmount
                            }
                            sigDigest
                            reason
                            id
                            expirationTimestamp
                            encodedProposalHash
                        }
                    }
                }
                number
                proposer
                slug
                createdTransactionHash
                createdTimestamp
                createdBlock
                canceledTimestamp
                canceledBlock
                canceled
                id
                lastUpdatedBlock
                lastUpdatedTimestamp
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

        if (
            !isNounProposalCandidateFromSubgraph(result.data.proposalCandidate)
        ) {
            return NextResponse.json(
                { error: 'Invalid data' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            result,
            headers: {
                'Cache-Control': 'no-store',
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(error, { status: 500 });
    }
}
