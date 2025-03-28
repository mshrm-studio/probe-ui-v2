'use client';

import { RpcContext } from '@/context/Rpc';
import { useContext, useEffect, useMemo, useState } from 'react';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
    address: string;
    shorten?: boolean;
}

export default function EthAddress({ address, shorten = true }: Props) {
    const { httpProvider } = useContext(RpcContext);

    const [ensName, setEnsName] = useState<string | null>(null);

    useEffect(() => {
        if (!httpProvider || !address) return;

        const storageKey = `ensNameFor_${address.toLowerCase()}`;

        const cachedEnsName = localStorage.getItem(storageKey);

        if (cachedEnsName) {
            setEnsName(cachedEnsName);
        } else {
            const fetchEnsName = async () => {
                try {
                    const name = await httpProvider.lookupAddress(address);

                    if (name) {
                        localStorage.setItem(storageKey, name);

                        setEnsName(name);
                    }
                } catch (error) {
                    console.error('Error fetching ENS name:', error);
                }
            };

            fetchEnsName();
        }
    }, [address, httpProvider]);

    const textToDisplay = useMemo(() => {
        if (ensName)
            return ensName.length > 20
                ? `${ensName.slice(0, 14)}..${ensName.slice(-4)}`
                : ensName;

        if (!shorten) return address;

        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    }, [address, ensName, shorten]);

    return <span>{textToDisplay}</span>;
}
