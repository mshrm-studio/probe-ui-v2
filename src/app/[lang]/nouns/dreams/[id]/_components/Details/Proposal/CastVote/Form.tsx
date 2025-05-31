'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import { DaoProxyContext } from '@/context/DaoProxy';
import { ProposalContext } from '@/context/Proposal';
import { useContext, useState } from 'react';
import {
    useAppKit,
    useAppKitAccount,
    useAppKitProvider,
} from '@reown/appkit/react';
import { BrowserProvider, Contract, Eip1193Provider } from 'ethers';
import clsx from 'clsx';
import Button from '@/app/_components/Button';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/proposal/cast-vote/form.module.css';
import FormField from '@/app/_components/FormField';
import Textarea from '@/app/_components/Textarea';
import { CurrentVotesContext } from '@/context/CurrentVotes';

interface Props {
    className?: string;
    dict: Dictionary;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CastVoteForm({ className, dict, setShowForm }: Props) {
    const { address, isConnected } = useAppKitAccount();
    const { open } = useAppKit();
    const { walletProvider } = useAppKitProvider('eip155');
    const { proposal } = useContext(ProposalContext);
    const { httpDaoProxyContract } = useContext(DaoProxyContext);
    const [reason, setReason] = useState<string>('');
    const { currentVotes } = useContext(CurrentVotesContext);

    const castVote = async (support: 'abstain' | 'against' | 'for') => {
        console.log('castVote', support);

        if (!isConnected || !address) {
            open();
            return;
        }

        if (typeof currentVotes !== 'number') {
            alert(dict.common.error.currentVotesNotKnown);
            return;
        }

        if (!httpDaoProxyContract) {
            alert(dict.common.error.daoProxyContractNotAvailable);
            return;
        }

        if (!walletProvider) {
            alert(dict.common.error.walletProviderNotAvailable);
            return;
        }

        if (process.env.NEXT_PUBLIC_PROBE_NOUNS_CLIENT_ID === undefined) {
            alert(dict.common.error.clientIdNotSet);
            return;
        }

        if (proposal?.status !== 'ACTIVE') {
            alert(dict.dream.error.proposalNotActive);
            return;
        }

        try {
            const provider = new BrowserProvider(
                walletProvider as Eip1193Provider
            );

            const signer = await provider.getSigner();

            const contractWithSigner = httpDaoProxyContract.connect(
                signer
            ) as Contract;

            // The support value for the vote. 0=against, 1=for, 2=abstain

            const voteValue =
                support === 'for' ? 1 : support === 'against' ? 0 : 2;

            console.log('voteValue', voteValue);

            const clientId = Number(
                process.env.NEXT_PUBLIC_PROBE_NOUNS_CLIENT_ID
            );

            console.log('clientId', clientId);

            const proposalId = Number(proposal.id);

            console.log('proposalId', proposalId);
            console.log('currentVotes', currentVotes);

            const trimmedReason = reason.trim();
            console.log('trimmedReason', trimmedReason);

            let fnMethod: string, args: (number | string)[];

            if (currentVotes === 0) {
                if (trimmedReason) {
                    fnMethod = 'castVoteWithReason(uint256,uint8,string)';
                    args = [proposalId, voteValue, trimmedReason];
                } else {
                    fnMethod = 'castVote(uint256,uint8)';
                    args = [proposalId, voteValue];
                }
            } else {
                if (trimmedReason) {
                    fnMethod =
                        'castRefundableVoteWithReason(uint256,uint8,string,uint32)';
                    args = [proposalId, voteValue, trimmedReason, clientId];
                } else {
                    fnMethod = 'castRefundableVote(uint256,uint8,uint32)';
                    args = [proposalId, voteValue, clientId];
                }
            }

            console.log('fnMethod', fnMethod);
            console.log('args', args);
            console.log('...args', ...args);

            const fn = contractWithSigner.getFunction(fnMethod);

            const tx = await fn(...args);

            await tx.wait();

            setShowForm(false);
        } catch (error: any) {
            console.error(error);
            alert(error?.info?.error?.message || error.code);
        }
    };

    return (
        <div className={clsx(className, styles.container)}>
            <div className={styles.voteReasonContainer}>
                <FormField label={dict.dream.details.reason.label}>
                    <Textarea
                        className={styles.voteReasonTextarea}
                        placeholder={dict.dream.details.reason.placeholder}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </FormField>
            </div>

            <div className={styles.voteButtonsContainer}>
                <div className={styles.forAgainstButtonsContainer}>
                    <Button
                        className={styles.forAgainstButton}
                        type="button"
                        color="green"
                        onClick={() => castVote('for')}
                    >
                        {dict.dream.details.castVoteFor}
                    </Button>

                    <Button
                        className={styles.forAgainstButton}
                        type="button"
                        color="red"
                        onClick={() => castVote('against')}
                    >
                        {dict.dream.details.castVoteAgainst}
                    </Button>
                </div>

                <Button
                    type="button"
                    color="grey"
                    onClick={() => castVote('abstain')}
                >
                    {dict.dream.details.castVoteAbstain}
                </Button>
            </div>
        </div>
    );
}
