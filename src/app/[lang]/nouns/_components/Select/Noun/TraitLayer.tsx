'use client';

import { useMemo } from 'react';
import Comboxbox from '@/app/_components/Combobox/Combobox';
import useDictionary from '@/hooks/useDictionary';
import { NounTraitLayer, nounTraitLayers } from '@/utils/enums/Noun/TraitLayer';

interface Props {
    excludeBackground?: boolean;
    label?: string;
    selected: NounTraitLayer | null;
    setSelected: React.Dispatch<React.SetStateAction<NounTraitLayer | null>>;
}

export default function SelectNounTraitLayer({
    excludeBackground,
    label,
    selected,
    setSelected,
}: Props) {
    const dict = useDictionary();

    const options = useMemo(() => {
        return nounTraitLayers.map((trait) => ({
            label: dict.common[trait] || trait,
            value: trait,
        }));
    }, [dict]);

    const filteredOptions = useMemo(() => {
        return excludeBackground
            ? options.filter(
                  (option) => option.value !== NounTraitLayer.Background
              )
            : options;
    }, [excludeBackground, options]);

    return (
        <Comboxbox
            label={label || dict.common.search}
            options={filteredOptions}
            selected={selected}
            setSelected={setSelected}
        />
    );
}
