import { gql } from 'urql';
import { NextRequest, NextResponse } from 'next/server';
import { urqlClient } from '@/utils/lib/urqlClient';
import { isNounProposalCandidateFromSubgraphList } from '@/utils/dto/Noun/Proposal/Candidate/FromSubgraph';

export async function GET(_req: NextRequest): Promise<NextResponse> {
    const clientId = process.env.NEXT_PUBLIC_PROBE_NOUNS_CLIENT_ID;

    const DATA_QUERY = gql`
        query ProposalCandidates {
            proposalCandidates(where: { slug_contains: "probe-dream-" }) {
                latestVersion {
                    content {
                        matchingProposalIds
                    }
                }
                slug
            }
        }
    `;

    try {
        const result = await urqlClient
            .query(DATA_QUERY, { clientId })
            .toPromise();

        if (result.error) {
            return NextResponse.json(
                { error: result.error.message },
                { status: 500 }
            );
        }

        if (
            !isNounProposalCandidateFromSubgraphList(
                result.data.proposalCandidates
            )
        ) {
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
