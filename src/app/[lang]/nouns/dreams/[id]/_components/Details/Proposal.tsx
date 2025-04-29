'use client';

import { ProposalContext } from '@/context/Proposal';
import { DreamFromDBWithCustomTrait } from '@/utils/dto/Dream/FromDB';
import { useContext } from 'react';

interface Props {
    dream: DreamFromDBWithCustomTrait;
}

export default function Proposal({ dream }: Props) {
    // const { httpDataProxyContract } = useContext(DataProxyContext);

    const { isCandidate } = useContext(ProposalContext);

    return <div>isCandidate: {isCandidate ? 'true' : 'false'}</div>;
}
