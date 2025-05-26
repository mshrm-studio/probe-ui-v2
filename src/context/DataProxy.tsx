'use client';

import { useContext, useEffect, useState } from 'react';
import { Project } from '@/utils/enums/Project';
import { createContext } from 'react';
import { Contract } from 'ethers';
import { RpcContext } from '@/context/Rpc';
import { nounsDataProxyContractABI } from '@/utils/contracts/NounsDataProxyContractABI';

interface DataProxy {
    httpDataProxyContract?: Contract | null;
}

export const DataProxyContext = createContext<DataProxy>({});

type Props = {
    children: React.ReactNode;
    project?: Project;
};

const DataProxyProvider: React.FC<Props> = ({
    children,
    project = Project.Nouns,
}) => {
    const { httpProvider } = useContext(RpcContext);
    const [httpDataProxyContract, setHttpDataProxyContract] =
        useState<Contract>();

    useEffect(() => {
        if (!httpProvider) return;

        const dataProxyContractAddress = process.env
            .NEXT_PUBLIC_NOUNS_DATA_PROXY_CONTRACT_ADDRESS as string;

        setHttpDataProxyContract(
            new Contract(
                dataProxyContractAddress,
                nounsDataProxyContractABI,
                httpProvider
            )
        );
    }, [project, httpProvider]);

    return (
        <DataProxyContext.Provider
            value={{
                httpDataProxyContract,
            }}
        >
            {children}
        </DataProxyContext.Provider>
    );
};

export default DataProxyProvider;
