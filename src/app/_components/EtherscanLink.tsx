'use client';

import Link from 'next/link';
import { useMemo } from 'react';

type Props = {
    address: string;
    children: React.ReactNode;
    className?: string;
    type: 'Address' | 'Transaction';
};

export default function EtherscanLink({
    address,
    children,
    className = 'text-link',
    type,
}: Props) {
    const etherscanDirectory = useMemo(
        () => (type === 'Transaction' ? 'tx' : type.toLowerCase()),
        [type]
    );

    const href = useMemo(() => {
        const chainId = process.env.NEXT_PUBLIC_CHAIN_ID as string;

        return chainId == '1'
            ? `https://etherscan.io/${etherscanDirectory}/${address}`
            : `https://sepolia.etherscan.io/${etherscanDirectory}/${address}`;
    }, [address, etherscanDirectory]);

    return (
        <Link href={href} className={className} target="_blank">
            {children}
        </Link>
    );
}
