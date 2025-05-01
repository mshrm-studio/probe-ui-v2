import { createClient, gql } from 'urql';
import { cacheExchange, fetchExchange } from '@urql/core';
import { NextRequest, NextResponse } from 'next/server';

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
        query ProposalCandidate($id: ID!) {
            proposalCandidate(id: $id) {
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
        const result = await client.query(DATA_QUERY, { id }).toPromise();

        if (result.error) {
            return NextResponse.json(
                { error: result.error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ result });
    } catch (error) {
        console.log('ProposalCandidateContent Error:', error);
        return NextResponse.json(error, { status: 500 });
    }
}
