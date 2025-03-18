import { createClient, gql } from 'urql';
import { cacheExchange, fetchExchange } from '@urql/core';
import { NextRequest, NextResponse } from 'next/server';
import { isAuctionFromSubgraph } from '@/utils/dto/Noun/Auction/FromSubgraph';

const client = createClient({
    url: `${process.env.SUBGRAPH_BASE_URL}/${process.env.SUBGRAPH_API_KEY}/subgraphs/id/${process.env.NOUNS_SUBGRAPH_ID}`,
    exchanges: [cacheExchange, fetchExchange],
});

export async function GET(req: NextRequest): Promise<NextResponse> {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get('id') ?? '0';

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
        const result = await client.query(DATA_QUERY, {}).toPromise();

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

        return NextResponse.json({ result });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
