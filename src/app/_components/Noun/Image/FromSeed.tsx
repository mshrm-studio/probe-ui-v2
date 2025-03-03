'use client';

import { getNounData } from '@noundry/nouns-assets';
import { useEffect, useRef, useState } from 'react';
import styles from '@/app/_styles/noun/image/from-seed.module.css';
import NounSeed from '@/utils/dto/Noun/Seed';
import { useInViewport } from 'react-in-viewport';

type Props = {
    seed: NounSeed;
};

export default function NounImageFromSeed({ seed }: Props) {
    const [failed, setFailed] = useState(false);
    const [generatedSvg, setGeneratedSvg] = useState('');

    const imgRef = useRef(null);

    const { inViewport } = useInViewport(
        imgRef,
        {},
        { disconnectOnLeave: true }
    );

    const generate = async () => {
        try {
            const { parts, background } = getNounData(seed);

            const response = await fetch('/api/build-svg', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    RLE_PARTS: parts,
                    BACKGROUND_COLOR: background,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate SVG');
            }

            const { svg } = await response.json();

            setGeneratedSvg(svg);
        } catch (error) {
            setFailed(true);
        }
    };

    useEffect(() => {
        if (inViewport && generatedSvg === '') generate();
    }, [inViewport, generatedSvg]);

    return (
        <div
            ref={imgRef}
            className={styles.container}
            dangerouslySetInnerHTML={{ __html: generatedSvg }}
        />
    );
}
