'use client';

import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { RpcContext } from '@/context/Rpc';

interface LatestBlock {
    number?: number;
    timestamp?: number;
}

export const LatestBlockContext = createContext<LatestBlock>({});

type Props = {
    children: React.ReactNode;
};

const LatestBlockProvider: React.FC<Props> = ({ children }) => {
    const [latestBlock, setLatestBlock] = useState<LatestBlock>();
    const { httpProvider: provider } = useContext(RpcContext);

    useEffect(() => {
        async function fetchCurrentVotes() {
            if (!provider) return;

            setLatestBlock(undefined);

            try {
                const block = await provider.getBlock('latest');

                // Example
                // baseFeePerGas: 372827101n
                // blobGasUsed: 262144n
                // difficulty: 0n
                // excessBlobGas: 0n
                // extraData: "0x6265617665726275696c642e6f7267"
                // gasLimit: 36000000n
                // gasUsed: 14635381n
                // hash: "0xb6e9110e283521abc722e423aeb9f5d929c0e923bb979e4a5f41b37aa49b51a7"
                // miner: "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5"
                // nonce: "0x0000000000000000"
                // number: 22559216
                // parentBeaconBlockRoot: "0x01e754849e2331eb0267b54c1c7346a3258e1ba3e5da5288a07b0464b3db2993"
                // parentHash: "0xf02454f7fa587249e7a8b9b6793b6d0ad764d17c43775a926b362142fb65fcbc"
                // prevRandao: "0xccc5c7d34de9ee60bff613acc7458247dfa4f9d8ece2505e42aeed567cc88719"
                // provider: JsonRpcProvider {#subs: Map(0), #plugins: Map(0), #pausedState: null, #destroyed: false, #networkPromise: Promise, …}
                // receiptsRoot: "0xb82ba344c31dd15e482229e8bd0f6e9555e73287e0db23f97feeaff221eb0370"
                // stateRoot: "0x635a53f7eb28ed1477cf5874c680f07ddc05220eb5771b7e8ae957b4124fe050"
                // timestamp: 1748168579
                // #transactions: Array(180)

                if (block) {
                    setLatestBlock({
                        number: block.number,
                        timestamp: block.timestamp,
                    });
                }
            } catch (error: any) {
                console.error(error);

                alert(error?.info?.error?.message || error?.message);
            }
        }

        fetchCurrentVotes();
    }, [provider]);

    return (
        <LatestBlockContext.Provider
            value={{
                number: latestBlock?.number,
                timestamp: latestBlock?.timestamp,
            }}
        >
            {children}
        </LatestBlockContext.Provider>
    );
};

export default LatestBlockProvider;
