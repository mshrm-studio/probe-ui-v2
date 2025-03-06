'use client';

import Comboxbox from '@/app/_components/Combobox/Combobox';
import useDictionary from '@/hooks/useDictionary';

interface Props {
    selected: string | null;
    setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SelectNounBackground({ selected, setSelected }: Props) {
    const dict = useDictionary();

    return (
        <Comboxbox
            label={dict.common.background}
            options={[
                {
                    imgSrc: 'nouns/traits/backgrounds/bg-cool.svg',
                    label: dict.traits['background-cool'],
                    value: 'd5d7e1',
                },
                {
                    imgSrc: 'nouns/traits/backgrounds/bg-warm.svg',
                    label: dict.traits['background-warm'],
                    value: 'e1d7d5',
                },
            ]}
            selected={selected}
            setSelected={setSelected}
        />
    );
}
