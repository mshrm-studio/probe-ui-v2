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
                const block = await provider.getBlock(proposal.startBlock);

                if (block) {
                    setStartTime(block.timestamp);
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
