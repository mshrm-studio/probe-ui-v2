'use client';

import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { TokenContext } from '@/context/Token';
import { BrowserProvider, Contract, Eip1193Provider } from 'ethers';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';

interface CurrentVotesContext {
    currentVotes?: number | null;
}

export const CurrentVotesContext = createContext<CurrentVotesContext>({});

type Props = {
    children: React.ReactNode;
};

const CurrentVotesProvider: React.FC<Props> = ({ children }) => {
    const { httpTokenContract } = useContext(TokenContext);
    const { walletProvider } = useAppKitProvider('eip155');
    const { address } = useAppKitAccount();
    const [currentVotes, setCurrentVotes] = useState<number>();

    useEffect(() => {
        async function fetchCurrentVotes() {
            if (!address || !httpTokenContract || !walletProvider) return;

            setCurrentVotes(undefined);

            try {
                const provider = new BrowserProvider(
                    walletProvider as Eip1193Provider
                );

                const signer = await provider.getSigner();

                const tokenContractWithSigner = httpTokenContract.connect(
                    signer
                ) as Contract;

                const votes = await tokenContractWithSigner.getCurrentVotes(
                    address
                ); // BigInt 0n

                setCurrentVotes(Number(votes));
            } catch (error: any) {
                console.error(error);

                alert(error?.info?.error?.message || error?.message);
            }
        }

        fetchCurrentVotes();
    }, [address, httpTokenContract, walletProvider]);

    return (
        <CurrentVotesContext.Provider
            value={{
                currentVotes,
            }}
        >
            {children}
        </CurrentVotesContext.Provider>
    );
};

export default CurrentVotesProvider;
