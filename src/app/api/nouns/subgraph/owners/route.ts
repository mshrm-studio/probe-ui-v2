import { gql } from 'urql';
import { NextRequest, NextResponse } from 'next/server';
import { urqlClient } from '@/utils/lib/urqlClient';

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
        const result = await urqlClient.query(DATA_QUERY, {}).toPromise();

        console.log('owners result', result);

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

        const response = NextResponse.json({ result });
        response.headers.set('Cache-Control', 'no-store');
        return response;
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
