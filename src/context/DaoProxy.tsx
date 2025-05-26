'use client';

import { useContext, useEffect, useState } from 'react';
import { Project } from '@/utils/enums/Project';
import { createContext } from 'react';
import { Contract } from 'ethers';
import { RpcContext } from '@/context/Rpc';
import { nounsDaoProxyContractABI } from '@/utils/contracts/NounsDaoProxyContractABI';

interface DaoProxy {
    httpDaoProxyContract?: Contract | null;
}

export const DaoProxyContext = createContext<DaoProxy>({});

type Props = {
    children: React.ReactNode;
    project?: Project;
};

const DaoProxyProvider: React.FC<Props> = ({
    children,
    project = Project.Nouns,
}) => {
    const { httpProvider } = useContext(RpcContext);
    const [httpDaoProxyContract, setHttpDaoProxyContract] =
        useState<Contract>();

    useEffect(() => {
        if (!httpProvider) return;

        const daoProxyContractAddress = process.env
            .NEXT_PUBLIC_NOUNS_DAO_PROXY_CONTRACT_ADDRESS as string;

        setHttpDaoProxyContract(
            new Contract(
                daoProxyContractAddress,
                nounsDaoProxyContractABI,
                httpProvider
            )
        );
    }, [project, httpProvider]);

    return (
        <DaoProxyContext.Provider
            value={{
                httpDaoProxyContract,
            }}
        >
            {children}
        </DaoProxyContext.Provider>
    );
};

export default DaoProxyProvider;
