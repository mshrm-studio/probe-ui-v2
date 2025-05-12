'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTraitBitmap } from '@/hooks/V2/useTraitBitmap';
import DreamSeed from '@/utils/dto/Dream/Seed';

interface Props {
    circleCrop?: boolean;
    margin?: number;
    seed: DreamSeed;
    size?: number;
}

export const DreamImageFromSeed: React.FC<Props> = ({
    circleCrop = false,
    margin = 0,
    seed,
    size,
}) => {
    // console.log('[DreamImageFromSeed] render:', seed, new Date().toISOString());

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [inheritedSize, setInheritedSize] = useState<number | null>(null);

    const body = useTraitBitmap('bodies', seed.body);
    const accessory = useTraitBitmap('accessories', seed.accessory);
    const head = useTraitBitmap('heads', seed.head);
    const glasses = useTraitBitmap('glasses', seed.glasses);

    useEffect(() => {
        if (!size && canvasRef.current) {
            const observer = new ResizeObserver(([entry]) => {
                const parentHeight = entry.contentRect.height;
                const parentWidth = entry.contentRect.width;
                setInheritedSize(Math.min(parentHeight, parentWidth));
            });

            observer.observe(canvasRef.current.parentElement!);

            return () => observer.disconnect();
        }
    }, [size]);

    const canvasSize = useMemo(() => {
        return size || inheritedSize || 100;
    }, [inheritedSize, size]);

    const backgroundColor = useMemo(() => {
        return seed.background == 0 ? '#d5d7e1' : '#e1d7d5';
    }, [seed.background]);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext('2d')!;

        if (!body || !accessory || !head || !glasses) {
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear any existing content
            return;
        }

        requestAnimationFrame(() => {
            canvas.style.width = '';
            canvas.style.height = '';
            canvas.width = canvasSize + margin * 2;
            canvas.height = canvasSize + margin * 2;

            ctx.imageSmoothingEnabled = false;
            ctx.clearRect(margin, margin, canvasSize, canvasSize);
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(margin, margin, canvasSize, canvasSize);

            // Draw images once all bitmaps are loaded
            ctx.drawImage(body, margin, margin, canvasSize, canvasSize);
            ctx.drawImage(accessory, margin, margin, canvasSize, canvasSize);
            ctx.drawImage(head, margin, margin, canvasSize, canvasSize);
            ctx.drawImage(glasses, margin, margin, canvasSize, canvasSize);

            if (circleCrop) {
                ctx.globalCompositeOperation = 'destination-in';
                ctx.beginPath();
                ctx.arc(
                    canvas.width / 2,
                    canvas.height / 2,
                    canvasSize / 2,
                    0,
                    Math.PI * 2
                );
                ctx.closePath();
                ctx.fill();
                ctx.globalCompositeOperation = 'source-over';
            }
        });
    }, [
        accessory,
        backgroundColor,
        body,
        canvasRef,
        canvasSize,
        circleCrop,
        head,
        glasses,
        margin,
    ]);

    return <canvas ref={canvasRef} />;
};
