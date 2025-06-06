import { gql } from 'urql';
import { NextRequest, NextResponse } from 'next/server';
import { urqlClient } from '@/utils/lib/urqlClient';
import { isNounProposalFromSubgraphList } from '@/utils/dto/Noun/Proposal/FromSubgraph';

export async function GET(_req: NextRequest): Promise<NextResponse> {
    const clientId = Number(process.env.NEXT_PUBLIC_PROBE_NOUNS_CLIENT_ID);
    const status = 'ACTIVE';

    const DATA_QUERY = gql`
        query Proposals($clientId: Int!, $status: ProposalStatus!) {
            proposals(where: { clientId: $clientId, status: $status }) {
                clientId
                endBlock
                id
                status
                title
            }
        }
    `;

    try {
        const result = await urqlClient
            .query(DATA_QUERY, { clientId, status })
            .toPromise();

        if (result.error) {
            return NextResponse.json(
                { error: result.error.message },
                { status: 500 }
            );
        }

        if (!isNounProposalFromSubgraphList(result.data.proposals)) {
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
