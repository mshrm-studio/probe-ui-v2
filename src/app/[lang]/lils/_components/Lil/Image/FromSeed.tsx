'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from '@/app/[lang]/lils/_styles/lil/image/from-seed.module.css';
import LilSeed from '@/utils/dto/Lil/Seed';
import { useInViewport } from 'react-in-viewport';
import { ImageData, getNounData } from '@noundry/lil-nouns-assets';
import { buildSVG } from '@nouns/sdk/dist/image/svg-builder';

type Props = {
    seed: LilSeed;
};

export default function LilImageFromSeed({ seed }: Props) {
    const [containerSquare, setContainerSquare] = useState(0);
    const [generatedSvg, setGeneratedSvg] = useState('');

    const imgRef = useRef(null);

    const { inViewport } = useInViewport(
        imgRef,
        {},
        { disconnectOnLeave: true }
    );

    const generateAndSetSvg = useCallback(async () => {
        try {
            const { parts, background } = getNounData({
                accessory: Number(seed.accessory),
                background: Number(seed.background),
                body: Number(seed.body),
                glasses: Number(seed.glasses),
                head: Number(seed.head),
            });

            console.log('Lil Image From Seed:', seed);
            console.log('Generating SVG with parts:', parts);
            console.log('Using background color:', background);

            // const response = await fetch('/api/lils/build-svg', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         RLE_PARTS: parts,
            //         BACKGROUND_COLOR: background,
            //     }),
            // });

            // if (!response.ok) {
            //     throw new Error('Failed to generate SVG');
            // }

            // const { svg } = await response.json();

            const svg = buildSVG(parts, ImageData.palette, background);

            setGeneratedSvg(svg);
        } catch (error) {
            setGeneratedSvg('');
        }
    }, [seed]);

    useEffect(() => {
        if (inViewport) {
            setGeneratedSvg('');
            generateAndSetSvg();
        }
    }, [inViewport, seed]);

    useEffect(() => {
        const el = imgRef.current;

        if (!el) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;

                setContainerSquare(Math.min(width, height));
            }
        });

        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={imgRef}
            className={styles.container}
            dangerouslySetInnerHTML={{ __html: generatedSvg }}
            style={
                {
                    '--container-square': `${containerSquare}px`,
                } as React.CSSProperties
            }
        />
    );
}
