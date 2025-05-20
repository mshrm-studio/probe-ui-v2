import { gql } from 'urql';
import { NextRequest, NextResponse } from 'next/server';
import { isNounAccountFromSubgraph } from '@/utils/dto/Noun/Account/FromSubgraph';
import { urqlClient } from '@/utils/lib/urqlClient';

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
        const result = await urqlClient.query(DATA_QUERY, { id }).toPromise();

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

        const response = NextResponse.json({ result });
        response.headers.set('Cache-Control', 'no-store');
        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json(error, { status: 500 });
    }
}
