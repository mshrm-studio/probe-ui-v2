'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import { RpcContext } from '@/context/Rpc';
import NounProposalFromSubgraph from '@/utils/dto/Noun/Proposal/FromSubgraph';
import { useContext, useEffect, useState } from 'react';
import LocalisedDateTime from '@/app/_components/LocalisedDateTime';

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

                console.log('[proposalPending] currentBlock', currentBlock);

                if (currentBlock) {
                    const currentTime = currentBlock.timestamp;
                    console.log('[proposalPending] currentTime', currentTime);
                    const currentNumber = currentBlock.number;
                    console.log(
                        '[proposalPending] currentNumber',
                        currentNumber
                    );
                    const blocksUntilStart =
                        Number(proposal.startBlock) - currentNumber;
                    console.log(
                        '[proposalPending] blocksUntilStart',
                        blocksUntilStart
                    );
                    const averageBlockTime = 12; // Approx. seconds per block on Ethereum mainnet
                    console.log(
                        '[proposalPending] averageBlockTime',
                        averageBlockTime
                    );
                    const estimatedStartTime =
                        currentTime + blocksUntilStart * averageBlockTime;
                    console.log(
                        '[proposalPending] estimatedStartTime',
                        estimatedStartTime
                    );

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
            <p>
                {dict.dream.details.proposalPendingStartsAt}:{' '}
                <LocalisedDateTime dateTime={startTime} />
            </p>
        );
    }

    return <p>{dict.dream.details.proposalPending}</p>;
}
