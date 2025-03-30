'use client';

import { useContext, useEffect, useState } from 'react';
import { Project } from '@/utils/enums/Project';
import { createContext } from 'react';
import { Contract } from 'ethers';
import { RpcContext } from '@/context/Rpc';
import { nounsTokenContractABI } from '@/utils/contracts/NounsTokenContractABI';

interface TokenContext {
    httpTokenContract?: Contract | null;
}

export const TokenContext = createContext<TokenContext>({});

type Props = {
    children: React.ReactNode;
    project?: Project;
};

const TokenProvider: React.FC<Props> = ({
    children,
    project = Project.Nouns,
}) => {
    const { httpProvider } = useContext(RpcContext);
    const [httpTokenContract, setHttpTokenContract] = useState<Contract>();

    useEffect(() => {
        if (!httpProvider) return;

        const tokenContractAddress = process.env
            .NEXT_PUBLIC_NOUNS_TOKEN_CONTRACT_ADDRESS as string;

        setHttpTokenContract(
            new Contract(
                tokenContractAddress,
                nounsTokenContractABI,
                httpProvider
            )
        );
    }, [project, httpProvider]);

    return (
        <TokenContext.Provider
            value={{
                httpTokenContract,
            }}
        >
            {children}
        </TokenContext.Provider>
    );
};

export default TokenProvider;
