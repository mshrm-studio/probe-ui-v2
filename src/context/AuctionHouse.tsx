'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Project } from '@/utils/enums/Project';
import { createContext } from 'react';
import { Contract } from 'ethers';
import { RpcContext } from '@/context/Rpc';
import { nounsAuctionHouseContractABI } from '@/utils/contracts/NounsAuctionHouseContractABI';
import { lilNounsAuctionHouseContractABI } from '@/utils/contracts/LilNounsAuctionHouseContractABI';

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
        const auctionHouseContractAddres =
            project === Project.Nouns
                ? (process.env
                      .NEXT_PUBLIC_NOUNS_AUCTION_HOUSE_CONTRACT_ADDRESS as string)
                : (process.env
                      .NEXT_PUBLIC_LIL_NOUNS_AUCTION_HOUSE_CONTRACT_ADDRESS as string);

        const auctionHouseContractABI =
            project === Project.Nouns
                ? nounsAuctionHouseContractABI
                : lilNounsAuctionHouseContractABI;

        setHttpAuctionHouseContract(
            new Contract(
                auctionHouseContractAddres,
                auctionHouseContractABI,
                httpProvider
            )
        );

        setWsAuctionHouseContract(
            new Contract(
                auctionHouseContractAddres,
                auctionHouseContractABI,
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
