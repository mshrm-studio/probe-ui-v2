'use client';

import SelectLilAccessory from '@/app/[lang]/lils/_components/Select/Lil/Accessory';
import SelectLilBody from '@/app/[lang]/lils/_components/Select/Lil/Body';
import SelectLilColor from '@/app/[lang]/lils/_components/Select/Lil/Color';
import SelectLilGlasses from '@/app/[lang]/lils/_components/Select/Lil/Glasses';
import SelectLilHead from '@/app/[lang]/lils/_components/Select/Lil/Head';
import SelectLilBackground from '@/app/[lang]/lils/_components/Select/Lil/Background';
import { useEffect, useState } from 'react';
import styles from '@/app/[lang]/lils/_styles/catalogue/controls/filters.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function LilsControlsFilters() {
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

    useEffect(() => {
        setAccessory(searchParams.get('accessory'));
        setBackground(searchParams.get('background'));
        setBody(searchParams.get('body'));
        setColor(searchParams.get('color'));
        setGlasses(searchParams.get('glasses'));
        setHead(searchParams.get('head'));
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

        router.push(pathname + '?' + params.toString());
    }, [accessory, background, body, color, glasses, head]);

    return (
        <div className={styles.container}>
            <SelectLilColor selected={color} setSelected={setColor} />

            <SelectLilAccessory
                selected={accessory}
                setSelected={setAccessory}
            />

            <SelectLilBody selected={body} setSelected={setBody} />

            <SelectLilGlasses selected={glasses} setSelected={setGlasses} />

            <SelectLilHead selected={head} setSelected={setHead} />

            <SelectLilBackground
                selected={background}
                setSelected={setBackground}
            />
        </div>
    );
}
