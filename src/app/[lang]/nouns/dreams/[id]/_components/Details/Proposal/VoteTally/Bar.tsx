'use client';

import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/proposal/vote-tally/bar.module.css';
import { useMemo } from 'react';

interface Props {
    quorum: string;
    supportTranslation: string;
    support: 'for' | 'against' | 'abstain';
    votes: string;
}

export default function VoteTallyBar({
    quorum,
    supportTranslation,
    support,
    votes,
}: Props) {
    const width = useMemo(
        () => Math.min((Number(votes) / Number(quorum)) * 100, 100),
        [quorum, votes]
    );

    const color = useMemo(() => {
        switch (support) {
            case 'for':
                return '#43A855';
            case 'against':
                return '#D7002A';
            default:
                return '#ABABAB';
        }
    }, [support]);

    return (
        <div className={styles.container}>
            <div className={styles.support}>{supportTranslation}</div>

            <div className={styles.barAndCount}>
                {width > 0 && (
                    <div
                        className={styles.bar}
                        style={{ width: `${width}%`, backgroundColor: color }}
                    ></div>
                )}

                <div className={styles.count} style={{ color }}>
                    {votes}
                </div>
            </div>
        </div>
    );
}
