'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Project } from '@/utils/enums/Project';
import { createContext } from 'react';
import { Contract } from 'ethers';
import { RpcContext } from '@/context/Rpc';
import { nounsAuctionHouseContractABI } from '@/utils/contracts/NounsAuctionHouseContractABI';

interface AuctionHouseContext {
    httpAuctionHouseContract?: Contract | null;
    wsAuctionHouseContract?: Contract | null;
}

export const AuctionHouseContext = createContext<AuctionHouseContext>({});

type Props = {
    children: React.ReactNode;
    project?: Project;
};

const AuctionHouseProvider: React.FC<Props> = ({
    children,
    project = Project.Nouns,
}) => {
    const { httpProvider, wsProvider } = useContext(RpcContext);
    const [httpAuctionHouseContract, setHttpAuctionHouseContract] =
        useState<Contract>();
    const [wsAuctionHouseContract, setWsAuctionHouseContract] =
        useState<Contract>();

    useEffect(() => {
        const auctionHouseContractAddres = process.env
            .NEXT_PUBLIC_NOUNS_AUCTION_HOUSE_CONTRACT_ADDRESS as string;

        setHttpAuctionHouseContract(
            new Contract(
                auctionHouseContractAddres,
                nounsAuctionHouseContractABI,
                httpProvider
            )
        );

        setWsAuctionHouseContract(
            new Contract(
                auctionHouseContractAddres,
                nounsAuctionHouseContractABI,
                wsProvider
            )
        );
    }, [project]);

    return (
        <AuctionHouseContext.Provider
            value={{
                httpAuctionHouseContract,
                wsAuctionHouseContract,
            }}
        >
            {children}
        </AuctionHouseContext.Provider>
    );
};

export default AuctionHouseProvider;
