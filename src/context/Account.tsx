'use client';

import NounAccountFromSubgraph, {
    isNounAccountFromSubgraph,
} from '@/utils/dto/Noun/Account/FromSubgraph';
import { useAppKitAccount } from '@reown/appkit/react';
import { createContext, useEffect, useState } from 'react';

interface Account {
    account?: NounAccountFromSubgraph;
}

export const AccountContext = createContext<Account>({});

type Props = {
    children: React.ReactNode;
};

const ProposalProvider: React.FC<Props> = ({ children }) => {
    const { address } = useAppKitAccount();
    const [account, setAccount] = useState<NounAccountFromSubgraph>();

    useEffect(() => {
        if (!address) return;

        const fetchAccount = async () => {
            try {
                const response = await fetch(
                    `/api/nouns/subgraph/account?id=${address}`,
                    {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch account');
                }

                const { result } = await response.json();

                if (!isNounAccountFromSubgraph(result.data.account)) {
                    throw new Error('Invalid data');
                }

                setAccount(result.data.account);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAccount();
    }, [address]);

    return (
        <AccountContext.Provider
            value={{
                account,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

export default ProposalProvider;
