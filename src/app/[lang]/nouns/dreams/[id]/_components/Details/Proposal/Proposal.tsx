'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import { ProposalContext } from '@/context/Proposal';
import { DreamFromDBWithCustomTrait } from '@/utils/dto/Dream/FromDB';
import { useContext, useMemo } from 'react';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/proposal/proposal.module.css';
import Signatures from '@/app/[lang]/nouns/dreams/[id]/_components/Details/Proposal/Signatures/Signatures';
import Promote from '@/app/[lang]/nouns/dreams/[id]/_components/Details/Proposal/Promote';
import DaoProxyProvider from '@/context/DaoProxy';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dict: Dictionary;
    dream: DreamFromDBWithCustomTrait;
}

export default function Proposal({ className, dict, dream }: Props) {
    const { proposalCandidate } = useContext(ProposalContext);

    const now = Math.floor(Date.now() / 1000);

    const validSignatures = useMemo(() => {
        const seen = new Set<string>();

        return (
            proposalCandidate?.latestVersion.content.contentSignatures.filter(
                (sig) => {
                    const signer = sig.signer.id.toLowerCase();
                    const isExpired = Number(sig.expirationTimestamp) <= now;

                    if (isExpired || seen.has(signer)) return false;

                    seen.add(signer);
                    return true;
                }
            ) || []
        );
    }, [proposalCandidate]);

    if (proposalCandidate) {
        return (
            <div className={className}>
                <Signatures
                    dict={dict}
                    proposalCandidate={proposalCandidate}
                    validSignatures={validSignatures}
                />

                {proposalCandidate.latestVersion.content.contentSignatures
                    .length >= 2 && (
                    <DaoProxyProvider>
                        <Promote
                            className={styles.promoteContainer}
                            dict={dict}
                            proposalCandidate={proposalCandidate}
                        />
                    </DaoProxyProvider>
                )}
            </div>
        );
    }

    return null;
}
