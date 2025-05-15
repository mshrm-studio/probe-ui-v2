import { createClient, gql } from 'urql';
import { cacheExchange, fetchExchange } from '@urql/core';
import { NextRequest, NextResponse } from 'next/server';
import { isNounAccountFromSubgraph } from '@/utils/dto/Noun/Account/FromSubgraph';

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
        query Account($id: ID!) {
            account(id: $id) {
                id
                totalTokensHeld
                delegate {
                    delegatedVotes
                    nounsRepresented {
                        id
                    }
                    tokenHoldersRepresentedAmount
                }
                tokenBalance
            }
        }
    `;

    try {
        const result = await client
            .query(DATA_QUERY, { id }, { requestPolicy: 'network-only' })
            .toPromise();

        if (result.error) {
            return NextResponse.json(
                { error: result.error.message },
                {
                    status: 500,
                    headers: {
                        'Cache-Control': 'no-store',
                    },
                }
            );
        }

        if (!isNounAccountFromSubgraph(result.data.account)) {
            return NextResponse.json(
                { error: 'Invalid data' },
                {
                    status: 500,
                    headers: {
                        'Cache-Control': 'no-store',
                    },
                }
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
