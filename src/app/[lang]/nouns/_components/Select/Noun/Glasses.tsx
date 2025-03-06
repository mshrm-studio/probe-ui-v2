'use client';

import { useMemo } from 'react';
import Comboxbox from '@/app/_components/Combobox/Combobox';
import { ImageData } from '@noundry/nouns-assets';
import useDictionary from '@/hooks/useDictionary';

interface Props {
    selected: string | null;
    setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SelectNounGlasses({ selected, setSelected }: Props) {
    const dict = useDictionary();
    const { images } = ImageData;
    const { glasses } = images;

    const options = useMemo(() => {
        return glasses
            .sort((a, b) => a.filename.localeCompare(b.filename))
            .map((trait) => ({
                encodedImage: trait,
                label: dict.traits[trait.filename] || trait.filename,
                value: trait.filename,
            }));
    }, [dict, glasses]);

    return (
        <Comboxbox
            label={dict.common.glasses}
            options={options}
            selected={selected}
            setSelected={setSelected}
        />
    );
}
