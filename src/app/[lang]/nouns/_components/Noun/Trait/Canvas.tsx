'use client';

import { useEffect, useRef } from 'react';
import { ImageData } from '@noundry/nouns-assets';
import { useInViewport } from 'react-in-viewport';

function decodeRLE(image: string) {
    const data = image.replace(/^0x/, '');
    const paletteIndex = parseInt(data.substring(0, 2), 16);

    const bounds = {
        top: parseInt(data.substring(2, 4), 16),
        right: parseInt(data.substring(4, 6), 16),
        bottom: parseInt(data.substring(6, 8), 16),
        left: parseInt(data.substring(8, 10), 16),
    };

    const rects = data.substring(10);
    const decodedRects =
        rects
            .match(/.{1,4}/g)
            ?.map((rect) => [
                parseInt(rect.substring(0, 2), 16),
                parseInt(rect.substring(2, 4), 16),
            ]) || [];

    return { paletteIndex, bounds, decodedRects };
}

function renderRLEToCanvas(canvas: HTMLCanvasElement, rleData: string) {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { palette } = ImageData;
    const { bounds, decodedRects } = decodeRLE(rleData);

    const pixelSize = 1;
    let currentX = bounds.left;
    let currentY = bounds.top;

    decodedRects.forEach(([runLength, colorIndex]) => {
        const hexColor = `#${palette[colorIndex]}`;

        let length = runLength;
        while (length > 0) {
            const drawWidth = Math.min(length, bounds.right - currentX);

            if (colorIndex !== 0) {
                ctx.fillStyle = hexColor;
                ctx.fillRect(
                    currentX * pixelSize,
                    currentY * pixelSize,
                    drawWidth * pixelSize,
                    pixelSize
                );
            }

            currentX += drawWidth;
            if (currentX >= bounds.right) {
                currentX = bounds.left;
                currentY++;
            }
            length -= drawWidth;
        }
    });
}

interface Props extends React.HTMLAttributes<HTMLCanvasElement> {
    rleData: string;
}

export default function TraitCanvas({ className, rleData }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { inViewport } = useInViewport(
        canvasRef,
        {},
        { disconnectOnLeave: true }
    );

    useEffect(() => {
        if (inViewport && canvasRef.current) {
            renderRLEToCanvas(canvasRef.current, rleData);
        }
    }, [inViewport, rleData]);

    return (
        <canvas ref={canvasRef} className={className} height={32} width={32} />
    );
}
