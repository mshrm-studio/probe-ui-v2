'use client';

import { AuctionHouseContext } from '@/context/AuctionHouse';
import { RpcContext } from '@/context/Rpc';
import { useContext, useEffect, useState } from 'react';

const useAuctionSettler = (blockNumber?: number | null) => {
    const { httpProvider: provider } = useContext(RpcContext);
    const { httpAuctionHouseContract: contract } =
        useContext(AuctionHouseContext);
    const [settledByAddress, setSettledByAddress] = useState<string>();
    const [settledByTimestamp, setSettledByTimestamp] = useState<number>();

    useEffect(() => {
        if (!blockNumber || !contract || !provider) return;

        const fetchSettledEvents = async () => {
            try {
                const logs = await contract.queryFilter(
                    'AuctionSettled',
                    blockNumber,
                    blockNumber
                );

                if (Array.isArray(logs) && logs.length === 1) {
                    const auctionEvent = logs[0];

                    if (auctionEvent) {
                        const transaction = await provider.getTransaction(
                            auctionEvent.transactionHash
                        );

                        if (transaction) {
                            setSettledByAddress(transaction.from);
                        }

                        const block = await provider.getBlock(
                            auctionEvent.blockNumber
                        );

                        if (block) {
                            setSettledByTimestamp(block.timestamp);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchSettledEvents();
    }, [contract, blockNumber, provider]);

    return { settledByAddress, settledByTimestamp };
};

export default useAuctionSettler;
