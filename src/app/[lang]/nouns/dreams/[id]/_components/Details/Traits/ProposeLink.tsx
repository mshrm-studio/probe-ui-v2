'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import { ProposalContext } from '@/context/Proposal';
import { DreamFromDBWithCustomTrait } from '@/utils/dto/Dream/FromDB';
import Link from 'next/link';
import { useContext } from 'react';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/traits/propose-link.module.css';

interface Props {
    dict: Dictionary;
    dream: DreamFromDBWithCustomTrait;
}

export default function ProposeLink({ dict, dream }: Props) {
    const { isCandidate } = useContext(ProposalContext);

    if (typeof isCandidate === 'boolean' && !isCandidate) {
        return (
            <Link
                href={`/nouns/dreams/${dream.id}/propose`}
                className={styles.link}
            >
                {dict.dream.details.propose}
            </Link>
        );
    }

    return null;
}
