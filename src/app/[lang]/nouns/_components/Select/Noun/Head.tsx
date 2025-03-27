'use client';

import { useMemo } from 'react';
import Comboxbox from '@/app/_components/Combobox/Combobox';
import { ImageData } from '@noundry/nouns-assets';
import useDictionary from '@/hooks/useDictionary';

interface Props {
    selected: string | null;
    setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SelectNounHead({ selected, setSelected }: Props) {
    const dict = useDictionary();
    const { images } = ImageData;
    const { heads } = images;

    const options = useMemo(() => {
        return heads
            .map((trait) => ({
                encodedImage: trait,
                label: dict.traits[trait.filename] || trait.filename,
                value: trait.filename,
            }))
            .sort((a, b) => a.label.localeCompare(b.label));
    }, [dict, heads]);

    return (
        <Comboxbox
            label={dict.common.head}
            options={options}
            selected={selected}
            setSelected={setSelected}
        />
    );
}
