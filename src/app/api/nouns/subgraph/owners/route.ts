import { createClient, gql } from 'urql';
import { cacheExchange, fetchExchange } from '@urql/core';
import { NextRequest, NextResponse } from 'next/server';

const client = createClient({
    url: `${process.env.SUBGRAPH_BASE_URL}/${process.env.SUBGRAPH_API_KEY}/subgraphs/id/${process.env.NOUNS_SUBGRAPH_ID}`,
    exchanges: [cacheExchange, fetchExchange],
});

export async function GET(_req: NextRequest) {
    const DATA_QUERY = gql`
        {
            accounts(where: { tokenBalance_not: "0" }) {
                tokenBalance
                id
            }
        }
    `;

    try {
        const result = await client.query(DATA_QUERY, {}).toPromise();

        if (result.error) {
            return NextResponse.json(
                { error: result.error.message },
                { status: 500 }
            );
        }

        if (!Array.isArray(result.data.owners)) {
            return NextResponse.json(
                { error: 'Invalid data' },
                { status: 500 }
            );
        }

        return NextResponse.json({ result });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
