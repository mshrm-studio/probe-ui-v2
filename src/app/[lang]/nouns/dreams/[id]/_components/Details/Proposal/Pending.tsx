'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import NounProposalFromSubgraph from '@/utils/dto/Noun/Proposal/FromSubgraph';
import { useContext, useEffect, useState } from 'react';
import LocalisedDateTime from '@/app/_components/LocalisedDateTime';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/proposal/pending.module.css';
import { LatestBlockContext } from '@/context/LatestBlock';

interface Props {
    dict: Dictionary;
    proposal: NounProposalFromSubgraph;
}

export default function ProposalPending({ dict, proposal }: Props) {
    const { number, timestamp } = useContext(LatestBlockContext);
    const [startTime, setStartTime] = useState<number>();

    useEffect(() => {
        if (typeof number !== 'number' || typeof timestamp !== 'number') {
            setStartTime(undefined);
            return;
        }

        const blocksUntilStart = Number(proposal.startBlock) - number;
        const averageBlockTime = 12; // Approx. seconds per block on Ethereum mainnet
        const estimatedStartTime =
            timestamp + blocksUntilStart * averageBlockTime;

        setStartTime(estimatedStartTime);
    }, [number, timestamp]);

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
