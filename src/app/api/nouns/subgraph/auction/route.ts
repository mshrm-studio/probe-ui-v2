import { gql } from 'urql';
import { NextRequest, NextResponse } from 'next/server';
import { isAuctionFromSubgraph } from '@/utils/dto/Noun/Auction/FromSubgraph';
import { urqlClient } from '@/utils/lib/urqlClient';

export async function GET(req: NextRequest): Promise<NextResponse> {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get('id') || '0';

    const DATA_QUERY = gql`
        {
            auction(id: ${id}) {
                amount
                clientId
                settled
                endTime
                noun {
                    id
                    owner {
                        id
                    }
                    seed {
                        accessory
                        background
                        body
                        glasses
                        head
                    }
                }
                bids(orderBy: amount, first: 1000) {
                    amount
                    bidder {
                        id
                    }
                    clientId
                }
                bidder {
                    id
                }
            }
        }
    `;

    try {
        const result = await urqlClient.query(DATA_QUERY, {}).toPromise();

        if (result.error) {
            return NextResponse.json(
                { error: result.error.message },
                { status: 500 }
            );
        }

        if (!isAuctionFromSubgraph(result.data.auction)) {
            return NextResponse.json(
                { error: 'Invalid data' },
                { status: 500 }
            );
        }

        const response = NextResponse.json({ result });
        response.headers.set('Cache-Control', 'no-store');
        return response;
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
