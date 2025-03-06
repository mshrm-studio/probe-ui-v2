'use client';

import Comboxbox from '@/app/_components/Combobox/Combobox';
import useDictionary from '@/hooks/useDictionary';
import { useEffect, useMemo, useState } from 'react';

interface Props {
    selected: string | null;
    setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SelectNounOwner({ selected, setSelected }: Props) {
    const dict = useDictionary();

    const [owners, setOwners] = useState<string[]>([]);

    const fetchOwners = async () => {
        try {
            const response = await fetch('/api/subgraph/owners', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch owners');
            }

            const json = await response.json();

            console.log(json);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchOwners();
    }, []);

    const options = useMemo(() => {
        return owners.map((owner) => ({
            label: owner,
            value: owner,
        }));
    }, [owners]);

    if (options.length === 0) return null;

    return (
        <Comboxbox
            label={dict.common.owner}
            options={options}
            selected={selected}
            setSelected={setSelected}
        />
    );
}
