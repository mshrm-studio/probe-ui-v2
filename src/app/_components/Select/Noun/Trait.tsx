'use client';

import { useMemo } from 'react';
import Comboxbox from '@/app/_components/Combobox/Combobox';
import { ImageData } from '@noundry/nouns-assets';
import useDictionary from '@/hooks/useDictionary';

interface Props {
    selected: string | null;
    setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SelectNounTrait({ selected, setSelected }: Props) {
    const dict = useDictionary();
    const { images } = ImageData;

    const options = useMemo(() => {
        return Object.values(images)
            .flat()
            .sort((a, b) => a.filename.localeCompare(b.filename))
            .map((trait) => ({
                encodedImage: trait,
                label: dict.traits[trait.filename] || trait.filename,
                value: trait.filename,
            }));
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
