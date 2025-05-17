'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import { RpcContext } from '@/context/Rpc';
import NounProposalFromSubgraph from '@/utils/dto/Noun/Proposal/FromSubgraph';
import { useContext, useEffect, useState } from 'react';
import LocalisedDateTime from '@/app/_components/LocalisedDateTime';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/proposal/pending.module.css';

interface Props {
    dict: Dictionary;
    proposal: NounProposalFromSubgraph;
}

export default function ProposalPending({ dict, proposal }: Props) {
    const { httpProvider: provider } = useContext(RpcContext);
    const [startTime, setStartTime] = useState<number>();

    useEffect(() => {
        if (!provider) {
            setStartTime(undefined);
            return;
        }

        const fetchProposal = async () => {
            try {
                const currentBlock = await provider.getBlock('latest');

                if (currentBlock) {
                    const currentTime = currentBlock.timestamp;
                    const currentNumber = currentBlock.number;
                    const blocksUntilStart =
                        Number(proposal.startBlock) - currentNumber;
                    const averageBlockTime = 12; // Approx. seconds per block on Ethereum mainnet
                    const estimatedStartTime =
                        currentTime + blocksUntilStart * averageBlockTime;

                    setStartTime(estimatedStartTime);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchProposal();
    }, [proposal, provider]);

    if (startTime) {
        return (
            <p className={styles.container}>
                {dict.dream.details.proposalPendingStartsAt}:<br />
                <LocalisedDateTime dateTime={startTime} />
            </p>
        );
    }

    return <p>{dict.dream.details.proposalPending}</p>;
}
