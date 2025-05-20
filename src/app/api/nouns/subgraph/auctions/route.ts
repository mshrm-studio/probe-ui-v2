import { gql } from 'urql';
import { NextRequest, NextResponse } from 'next/server';
import { isAuctionFromSubgraphList } from '@/utils/dto/Noun/Auction/FromSubgraph';
import { urqlClient } from '@/utils/lib/urqlClient';

export async function GET(_req: NextRequest): Promise<NextResponse> {
    const DATA_QUERY = gql`
        {
            auctions(where: { settled: false }) {
                endTime
                noun {
                    id
                    seed {
                        accessory
                        background
                        body
                        glasses
                        head
                    }
                }
            }
        }
    `;

    try {
        const result = await urqlClient.query(DATA_QUERY, {}).toPromise();

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

        if (!isAuctionFromSubgraphList(result.data.auctions)) {
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
        return NextResponse.json(error, { status: 500 });
    }
}
