'use client';

import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { mainnet, sepolia } from '@reown/appkit/networks';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;
const infuraApiKey = process.env.NEXT_PUBLIC_INFURA_API_KEY as string;
const defaultChainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID as string);

const customMainnet = {
    ...mainnet,
    rpcUrls: {
        default: {
            http: [`https://mainnet.infura.io/v3/${infuraApiKey}`],
        },
    },
};

const customSepolia = {
    ...sepolia,
    rpcUrls: {
        default: {
            http: [`https://sepolia.infura.io/v3/${infuraApiKey}`],
        },
    },
};

const metadata = {
    name: 'probe.wtf',
    description: 'Probing Nouns & Lil Nouns',
    url: process.env.NEXT_PUBLIC_URL as string,
    icons: [`${process.env.NEXT_PUBLIC_DO_STORAGE_URL}/Probe_Logo.svg`],
};

createAppKit({
    adapters: [new EthersAdapter()],
    metadata,
    networks: defaultChainId === 1 ? [customMainnet] : [customSepolia],
    projectId,
    features: {
        analytics: true,
    },
});

export default function AppKitProvider({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return children;
}
