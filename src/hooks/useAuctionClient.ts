'use client';

import { useEffect, useState } from 'react';

const useAuctionClient = (clientId?: number | string | null) => {
    const [client, setClient] = useState<{
        id: number;
        name: string;
        url?: string;
    }>();

    useEffect(() => {
        const clientMap = [
            { id: 1, name: 'noundry', url: 'https://www.noundry.wtf' },
            { id: 2, name: 'House of Nouns' },
            { id: 3, name: 'Camp', url: 'https://nouns.camp' },
            { id: 4, name: 'Nouns.biz', url: 'https://nouns.biz' },
            { id: 5, name: 'NounSwap', url: 'https://www.nounswap.wtf' },
            { id: 6, name: 'nouns.game', url: 'https://nouns.game' },
            { id: 7, name: 'Nouns Terminal', url: 'https://nouns.sh' },
            { id: 8, name: 'Nouns Esports', url: 'https://nouns.gg' },
            { id: 9, name: 'probe', url: 'https://probe.wtf' },
            { id: 10, name: 'Agora', url: 'https://nounsagora.com' },
            { id: 11, name: 'berries', url: 'https://nouns.farm' },
            {
                id: 12,
                name: 'Nouns Prop Launchpad',
                url: 'https://proplaunchpad.com',
            },
            {
                id: 13,
                name: 'etherscan donate address',
                url: 'https://www.etherscan.io',
            },
            { id: 14, name: 'pronouns', url: 'https://pronouns.gg' },
            { id: 15, name: 'Nouns Auction', url: 'https://nouns.auction' },
            { id: 16, name: 'Lighthouse' },
            {
                id: 17,
                name: 'nouns-protocol',
                url: 'https://github.com/obvious-inc/nouns-protocol',
            },
        ];

        setClient(clientMap.find((client) => client.id == Number(clientId)));
    }, [clientId]);

    return client;
};

export default useAuctionClient;
