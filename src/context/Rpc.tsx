'use client';

import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { JsonRpcProvider, WebSocketProvider } from 'ethers';

interface RpcContext {
    httpProvider?: JsonRpcProvider | null;
    wsProvider?: WebSocketProvider | null;
}

export const RpcContext = createContext<RpcContext>({});

type Props = {
    children: React.ReactNode;
};

const RpcProvider: React.FC<Props> = ({ children }) => {
    const [httpProvider, setHttpProvider] = useState<JsonRpcProvider>();
    const [wsProvider, setWsProvider] = useState<WebSocketProvider>();

    useEffect(() => {
        const defaultChainId = Number(
            process.env.NEXT_PUBLIC_CHAIN_ID as string
        );

        const chain = defaultChainId == 1 ? 'mainnet' : 'sepolia';

        const infuraApiKey = process.env.NEXT_PUBLIC_INFURA_API_KEY as string;

        const httpJsonRpcProvider = new JsonRpcProvider(
            `https://${chain}.infura.io/v3/${infuraApiKey}`
        );

        setHttpProvider(httpJsonRpcProvider);

        const websocketProvider = new WebSocketProvider(
            `wss://${chain}.infura.io/ws/v3/${infuraApiKey}`
        );

        setWsProvider(websocketProvider);
    }, []);

    return (
        <RpcContext.Provider
            value={{
                httpProvider,
                wsProvider,
            }}
        >
            {children}
        </RpcContext.Provider>
    );
};

export default RpcProvider;
