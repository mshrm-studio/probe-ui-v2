import { createClient, gql } from 'urql';
import { cacheExchange, fetchExchange } from '@urql/core';
import { NextRequest, NextResponse } from 'next/server';
import { isAuctionFromSubgraphList } from '@/utils/dto/Noun/Auction/FromSubgraph';

const client = createClient({
    url: `${process.env.SUBGRAPH_BASE_URL}/${process.env.SUBGRAPH_API_KEY}/subgraphs/id/${process.env.NOUNS_SUBGRAPH_ID}`,
    exchanges: [cacheExchange, fetchExchange],
});

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
        const result = await client.query(DATA_QUERY, {}).toPromise();

        if (result.error) {
            return NextResponse.json(
                { error: result.error.message },
                { status: 500 }
            );
        }

        if (!isAuctionFromSubgraphList(result.data.auctions)) {
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
