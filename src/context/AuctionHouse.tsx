'use client';

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Project } from '@/utils/enums/Project';
import { createContext } from 'react';
import { Contract } from 'ethers';
import { RpcContext } from '@/context/Rpc';
import { nounsAuctionHouseContractABI } from '@/utils/contracts/NounsAuctionHouseContractABI';
import { useAppKitAccount } from '@reown/appkit/react';

interface AuctionHouseContext {
    httpAuctionHouseContract?: Contract | null;
    wsAuctionHouseContract?: Contract | null;
    reservePrice?: number;
    minBidIncrementPercentage?: number;
}

export const AuctionHouseContext = createContext<AuctionHouseContext>({});

type Props = {
    children: React.ReactNode;
    project?: Project;
};

const minBidPercentageStorageKey = 'nounsAuctionMinBidPercentage';
const reservePriceStorageKey = 'nounsAuctionReservePrice';

const AuctionHouseProvider: React.FC<Props> = ({
    children,
    project = Project.Nouns,
}) => {
    const { isConnected } = useAppKitAccount();
    const { httpProvider, wsProvider } = useContext(RpcContext);
    const [httpAuctionHouseContract, setHttpAuctionHouseContract] =
        useState<Contract>();
    const [wsAuctionHouseContract, setWsAuctionHouseContract] =
        useState<Contract>();
    const [minBidIncrementPercentage, setMinBidIncrementPercentage] =
        useState<number>();
    const [reservePrice, setReservePrice] = useState<number>();

    useEffect(() => {
        const auctionHouseContractAddres = process.env
            .NEXT_PUBLIC_NOUNS_AUCTION_HOUSE_CONTRACT_ADDRESS as string;

        if (httpProvider) {
            setHttpAuctionHouseContract(
                new Contract(
                    auctionHouseContractAddres,
                    nounsAuctionHouseContractABI,
                    httpProvider
                )
            );
        }

        if (wsProvider) {
            setWsAuctionHouseContract(
                new Contract(
                    auctionHouseContractAddres,
                    nounsAuctionHouseContractABI,
                    wsProvider
                )
            );
        }
    }, [project, httpProvider, wsProvider]);

    const fetchMinBidIncrementPercentage = useCallback(async () => {
        if (!isConnected || !httpAuctionHouseContract) return;

        try {
            const pc =
                await httpAuctionHouseContract.minBidIncrementPercentage();

            setMinBidIncrementPercentage(Number(pc));

            localStorage.setItem(minBidPercentageStorageKey, String(pc));
        } catch (error) {
            console.error(
                'Failed to fetch auction min bid increment percentage',
                error
            );
        }
    }, [isConnected, httpAuctionHouseContract]);

    const fetchReservePrice = useCallback(async () => {
        if (!isConnected || !httpAuctionHouseContract) return;

        try {
            const reserve = await httpAuctionHouseContract.reservePrice();

            setReservePrice(Number(reserve));

            localStorage.setItem(reservePriceStorageKey, String(reserve));
        } catch (error) {
            console.error('Failed to fetch auction reserve price', error);
        }
    }, [isConnected, httpAuctionHouseContract]);

    useEffect(() => {
        if (!httpAuctionHouseContract) {
            console.warn('AuctionHouse contract not available');
            return;
        }

        if (!isConnected) {
            return;
        }

        const cachedMinBidPercentage = localStorage.getItem(
            minBidPercentageStorageKey
        );

        if (cachedMinBidPercentage) {
            setMinBidIncrementPercentage(Number(cachedMinBidPercentage));
        } else {
            fetchMinBidIncrementPercentage();
        }

        const cachedReservePrice = localStorage.getItem(reservePriceStorageKey);

        if (cachedReservePrice) {
            setReservePrice(Number(cachedReservePrice));
        } else {
            fetchReservePrice();
        }
    }, [isConnected, httpAuctionHouseContract]);

    return (
        <AuctionHouseContext.Provider
            value={{
                httpAuctionHouseContract,
                wsAuctionHouseContract,
                reservePrice,
                minBidIncrementPercentage,
            }}
        >
            {children}
        </AuctionHouseContext.Provider>
    );
};

export default AuctionHouseProvider;
