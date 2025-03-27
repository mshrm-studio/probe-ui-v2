'use client';

import { useMemo } from 'react';
import Comboxbox from '@/app/_components/Combobox/Combobox';
import { ImageData } from '@noundry/lil-nouns-assets';
import useDictionary from '@/hooks/useDictionary';

interface Props {
    selected: string | null;
    setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SelectLilTrait({ selected, setSelected }: Props) {
    const dict = useDictionary();
    const { images } = ImageData;

    const options = useMemo(() => {
        return Object.values(images)
            .flat()
            .map((trait) => ({
                encodedImage: trait,
                label: dict.traits[trait.filename] || trait.filename,
                value: trait.filename,
            }))
            .sort((a, b) => a.label.localeCompare(b.label));
    }, [dict, images]);

    return (
        <Comboxbox
            label={dict.common.search}
            options={options}
            selected={selected}
            setSelected={setSelected}
        />
    );
}
