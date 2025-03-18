'use client';

import { useEffect, useMemo, useState } from 'react';
import Comboxbox from '@/app/_components/Combobox/Combobox';
import chroma from 'chroma-js';
import useDictionary from '@/hooks/useDictionary';

interface Props {
    selected: string | null;
    setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SelectLilColor({ selected, setSelected }: Props) {
    const dict = useDictionary();
    const [fetching, setFetching] = useState(false);
    const [colors, setColors] = useState<string[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchColors() {
            try {
                setFetching(true);

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/lil-colors?per_page=9999`
                );

                const data = await res.json();

                if (
                    Array.isArray(data) &&
                    data.every((item) => typeof item === 'string')
                ) {
                    setColors(data);
                } else {
                    throw new Error('Invalid data');
                }
            } catch (err: unknown) {
                setError(String(err));
            } finally {
                setFetching(false);
            }
        }

        fetchColors();
    }, []);

    const colorsWithHue = useMemo(() => {
        return colors
            ? colors.map((color) => ({
                  hex: color,
                  hue: chroma(color).get('hsl.h'),
              }))
            : [];
    }, [colors]);

    const options = useMemo(() => {
        return colorsWithHue
            .map((color) => {
                const canvas = document.createElement('canvas');
                canvas.width = 24;
                canvas.height = 24;

                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.fillStyle = color.hex;
                    ctx.fillRect(0, 0, 24, 24);
                }

                return {
                    ...color,
                    imgSrc: canvas.toDataURL(),
                    label: color.hex,
                    value: color.hex,
                };
            })
            .sort((a, b) => a.hue - b.hue);
    }, [colorsWithHue]);

    return (
        <Comboxbox
            label={dict.common.color}
            options={options}
            selected={selected}
            setSelected={setSelected}
        />
    );
}
