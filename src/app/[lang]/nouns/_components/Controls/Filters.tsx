'use client';

import SelectNounAccessory from '@/app/_components/Select/Noun/Accessory';
import SelectNounBody from '@/app/_components/Select/Noun/Body';
import SelectNounColor from '@/app/_components/Select/Noun/Color';
import SelectNounGlasses from '@/app/_components/Select/Noun/Glasses';
import SelectNounHead from '@/app/_components/Select/Noun/Head';
import { useEffect, useState } from 'react';
import styles from '@/app/[lang]/nouns/_styles/controls/filters.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function NounsControlsFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [selectedAccessory, setSelectedAccessory] = useState<string | null>(
        searchParams.get('accessory')
    );
    const [selectedBody, setSelectedBody] = useState<string | null>(
        searchParams.get('body')
    );
    const [selectedColor, setSelectedColor] = useState<string | null>(
        searchParams.get('color')
    );
    const [selectedGlasses, setSelectedGlasses] = useState<string | null>(
        searchParams.get('glasses')
    );
    const [selectedHead, setSelectedHead] = useState<string | null>(
        searchParams.get('head')
    );

    useEffect(() => {
        setSelectedAccessory(searchParams.get('accessory'));
        setSelectedBody(searchParams.get('body'));
        setSelectedColor(searchParams.get('color'));
        setSelectedGlasses(searchParams.get('glasses'));
        setSelectedHead(searchParams.get('head'));
    }, [searchParams]);

    useEffect(() => {
        const params = new URLSearchParams();

        if (selectedAccessory) params.set('accessory', selectedAccessory);

        if (selectedBody) params.set('body', selectedBody);

        if (selectedColor) params.set('color', selectedColor);

        if (selectedGlasses) params.set('glasses', selectedGlasses);

        if (selectedHead) params.set('head', selectedHead);

        router.push(pathname + '?' + params.toString());
    }, [
        selectedAccessory,
        selectedBody,
        selectedColor,
        selectedGlasses,
        selectedHead,
    ]);

    return (
        <div className={styles.container}>
            <SelectNounColor
                selected={selectedColor}
                setSelected={setSelectedColor}
            />

            <SelectNounAccessory
                selected={selectedAccessory}
                setSelected={setSelectedAccessory}
            />

            <SelectNounBody
                selected={selectedBody}
                setSelected={setSelectedBody}
            />

            <SelectNounGlasses
                selected={selectedGlasses}
                setSelected={setSelectedGlasses}
            />

            <SelectNounHead
                selected={selectedHead}
                setSelected={setSelectedHead}
            />
        </div>
    );
}
