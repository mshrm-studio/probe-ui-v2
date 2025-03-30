import { NextRequest, NextResponse } from 'next/server';
import { buildSVG } from '@nouns/sdk';
import { ImageData } from '@noundry/lil-nouns-assets';

export async function POST(req: NextRequest) {
    try {
        const { RLE_PARTS, BACKGROUND_COLOR } = await req.json();

        const svg = buildSVG(RLE_PARTS, ImageData.palette, BACKGROUND_COLOR);

        return NextResponse.json({ svg });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
