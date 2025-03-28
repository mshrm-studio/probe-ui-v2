'use client';

import SelectNounAccessory from '@/app/[lang]/nouns/_components/Select/Noun/Accessory';
import SelectNounBody from '@/app/[lang]/nouns/_components/Select/Noun/Body';
import SelectNounColor from '@/app/[lang]/nouns/_components/Select/Noun/Color';
import SelectNounGlasses from '@/app/[lang]/nouns/_components/Select/Noun/Glasses';
import SelectNounHead from '@/app/[lang]/nouns/_components/Select/Noun/Head';
import SelectNounBackground from '@/app/[lang]/nouns/_components/Select/Noun/Background';
import SelectNounSettler from '@/app/[lang]/nouns/_components/Select/Noun/Settler';
import { useEffect, useState } from 'react';
import styles from '@/app/[lang]/nouns/_styles/catalogue/controls/filters.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function NounsControlsFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [accessory, setAccessory] = useState<string | null>(
        searchParams.get('accessory')
    );
    const [background, setBackground] = useState<string | null>(
        searchParams.get('background')
    );
    const [body, setBody] = useState<string | null>(searchParams.get('body'));
    const [color, setColor] = useState<string | null>(
        searchParams.get('color')
    );
    const [glasses, setGlasses] = useState<string | null>(
        searchParams.get('glasses')
    );
    const [head, setHead] = useState<string | null>(searchParams.get('head'));
    const [settler, setSettler] = useState<string | null>(
        searchParams.get('settler')
    );

    useEffect(() => {
        setAccessory(searchParams.get('accessory'));
        setBackground(searchParams.get('background'));
        setBody(searchParams.get('body'));
        setColor(searchParams.get('color'));
        setGlasses(searchParams.get('glasses'));
        setHead(searchParams.get('head'));
        setSettler(searchParams.get('settler'));
    }, [searchParams]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (accessory) {
            params.set('accessory', accessory);
        } else {
            params.delete('accessory');
        }

        if (background) {
            params.set('background', background);
        } else {
            params.delete('background');
        }

        if (body) {
            params.set('body', body);
        } else {
            params.delete('body');
        }

        if (color) {
            params.set('color', color);
        } else {
            params.delete('color');
        }

        if (glasses) {
            params.set('glasses', glasses);
        } else {
            params.delete('glasses');
        }

        if (head) {
            params.set('head', head);
        } else {
            params.delete('head');
        }

        if (settler) {
            params.set('settler', settler);
        } else {
            params.delete('settler');
        }

        router.push(pathname + '?' + params.toString());
    }, [accessory, background, body, color, glasses, head, settler]);

    return (
        <div className={styles.container}>
            <SelectNounColor selected={color} setSelected={setColor} />

            <SelectNounAccessory
                selected={accessory}
                setSelected={setAccessory}
            />

            <SelectNounBody selected={body} setSelected={setBody} />

            <SelectNounGlasses selected={glasses} setSelected={setGlasses} />

            <SelectNounHead selected={head} setSelected={setHead} />

            <SelectNounBackground
                selected={background}
                setSelected={setBackground}
            />

            <SelectNounSettler selected={settler} setSelected={setSettler} />
        </div>
    );
}
