import { gql } from 'urql';
import { NextRequest, NextResponse } from 'next/server';
import { isNounFromSubgraphList } from '@/utils/dto/Noun/FromSubgraph';
import { urqlClient } from '@/utils/lib/urqlClient';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const skip = Number(searchParams.get('skip') || '0');
    const accessory = searchParams.get('accessory') || null;
    const body = searchParams.get('body') || null;
    const glasses = searchParams.get('glasses') || null;
    const head = searchParams.get('head') || null;
    const idIn = searchParams.get('idIn') || null;

    const filters: Record<string, string | string[]> = {};
    if (accessory) filters.accessory = accessory;
    if (body) filters.body = body;
    if (glasses) filters.glasses = glasses;
    if (head) filters.head = head;
    if (idIn) filters.id_in = idIn.split('-');

    const where = Object.keys(filters).length > 0 ? { seed_: filters } : {};

    const DATA_QUERY = gql`
        query getNouns($skip: Int!, $where: Noun_filter) {
            nouns(first: 1000, skip: $skip, where: $where) {
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
    `;

    try {
        const result = await urqlClient
            .query(DATA_QUERY, { skip, where })
            .toPromise();

        if (result.error) {
            return NextResponse.json(
                { error: result.error.message },
                { status: 500 }
            );
        }

        if (!isNounFromSubgraphList(result.data.nouns)) {
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
