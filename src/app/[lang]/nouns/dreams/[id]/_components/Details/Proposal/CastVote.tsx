'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import { DaoProxyContext } from '@/context/DaoProxy';
import { ProposalContext } from '@/context/Proposal';
import { useContext } from 'react';
import {
    useAppKit,
    useAppKitAccount,
    useAppKitProvider,
} from '@reown/appkit/react';
import { BrowserProvider, Contract, Eip1193Provider } from 'ethers';
import clsx from 'clsx';

interface Props {
    className?: string;
    dict: Dictionary;
}

export default function CastVote({ className, dict }: Props) {
    const { address, isConnected } = useAppKitAccount();
    const { open } = useAppKit();
    const { walletProvider } = useAppKitProvider('eip155');
    const { proposal } = useContext(ProposalContext);
    const { httpDaoProxyContract } = useContext(DaoProxyContext);

    const castVote = async (support: 'abstain' | 'against' | 'for') => {
        if (!isConnected || !address) {
            open();
            return;
        }

        if (!walletProvider || !httpDaoProxyContract) return;

        if (proposal?.status !== 'ACTIVE') return;

        try {
            const provider = new BrowserProvider(
                walletProvider as Eip1193Provider
            );

            const signer = await provider.getSigner();

            const contractWithSigner = httpDaoProxyContract.connect(
                signer
            ) as Contract;

            const castRefundableVoteWithClientId =
                contractWithSigner.getFunction(
                    'castRefundableVote(uint256,uint8,uint32)'
                );

            // The support value for the vote. 0=against, 1=for, 2=abstain

            const tx = await castRefundableVoteWithClientId(
                Number(proposal.id),
                support === 'for' ? 1 : support === 'against' ? 0 : 2,
                Number(process.env.NEXT_PUBLIC_PROBE_NOUNS_CLIENT_ID)
            );

            await tx.wait();
        } catch (error: any) {
            console.error(error);
            alert(error?.info?.error?.message || error.code);
        }
    };

    if (proposal?.status !== 'ACTIVE') return null;

    return (
        <div className={clsx(className, 'flex space-x-2 items-center')}>
            <button type="button" onClick={() => castVote('for')}>
                {dict.dream.details.castVoteFor}
            </button>

            <button type="button" onClick={() => castVote('against')}>
                {dict.dream.details.castVoteAgainst}
            </button>

            <button type="button" onClick={() => castVote('abstain')}>
                {dict.dream.details.castVoteAbstain}
            </button>
        </div>
    );
}
