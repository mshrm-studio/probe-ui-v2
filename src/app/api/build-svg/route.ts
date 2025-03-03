import { NextRequest, NextResponse } from 'next/server';
import { buildSVG, PNGCollectionEncoder } from '@nouns/sdk';
import { ImageData } from '@noundry/nouns-assets';

export async function POST(req: NextRequest) {
    try {
        const { RLE_PARTS, BACKGROUND_COLOR } = await req.json();

        const encoder = new PNGCollectionEncoder(ImageData.palette);

        const PALETTE_COLORS = encoder.data.palette;

        const svg = buildSVG(RLE_PARTS, PALETTE_COLORS, BACKGROUND_COLOR);

        const body = JSON.stringify({ svg });

        return new NextResponse(body, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=604800', // 1 week
            },
        });

        return NextResponse.json({ svg });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
