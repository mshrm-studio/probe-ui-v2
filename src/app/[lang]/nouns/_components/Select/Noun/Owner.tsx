'use client';

import Comboxbox from '@/app/_components/Combobox/Combobox';
import useDictionary from '@/hooks/useDictionary';
import { useEffect, useMemo, useState } from 'react';
import fetchOwners from '@/utils/lib/nouns/owners/list';

interface Props {
    selected: string | null;
    setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SelectNounOwner({ selected, setSelected }: Props) {
    const dict = useDictionary();
    const [error, setError] = useState<any>('');
    const [fetching, setFetching] = useState(false);
    const [owners, setOwners] = useState<string[]>([]);

    const initFetchOwners = async () => {
        try {
            setFetching(true);
            setError('');

            const data = await fetchOwners();

            setOwners((prev) => {
                const newItems = data.filter(
                    (newOwner) =>
                        !prev.some(
                            (existingOwner) => existingOwner === newOwner
                        )
                );

                return [...prev, ...newItems];
            });
        } catch (err: unknown) {
            setError(String(err));
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        setOwners([]);
        initFetchOwners();
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
