import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        // Extract the URL query parameter
        const url = req.nextUrl.searchParams.get('url');

        // Validate that the URL is provided
        if (!url) {
            return NextResponse.json(
                { error: 'URL parameter is required' },
                { status: 400 }
            );
        }

        // Fetch the image from the provided URL
        const response = await fetch(url);

        // Check for errors in the external response
        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch external resource' },
                { status: response.status }
            );
        }

        // Read the response as a buffer
        const buffer = await response.arrayBuffer();

        // Return the image data with proper headers
        return new NextResponse(buffer, {
            headers: {
                'Content-Type':
                    response.headers.get('Content-Type') || 'image/png',
                'Access-Control-Allow-Origin': '*', // Allow all origins
                'Cache-Control': 'public, max-age=31536000, immutable', // Cache image
            },
        });
    } catch (error) {
        console.error(
            'Proxy Error:',
            typeof error === 'object' && error && 'message' in error
                ? error.message
                : error
        );

        return NextResponse.json(
            {
                error: 'Internal server error',
                details:
                    typeof error === 'object' && error && 'message' in error
                        ? error.message
                        : error,
            },
            { status: 500 }
        );
    }
}
