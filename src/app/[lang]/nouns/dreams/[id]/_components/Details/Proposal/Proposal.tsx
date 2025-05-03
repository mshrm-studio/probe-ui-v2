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

    const validSignatures = useMemo(() => {
        const seen = new Set<string>();

        return (
            proposalCandidate?.latestVersion.content.contentSignatures.filter(
                (sig) => {
                    const signer = sig.signer.id.toLowerCase();

                    if (seen.has(signer)) return false;

                    const isExpired =
                        Number(sig.expirationTimestamp) <=
                        Math.floor(Date.now() / 1000);

                    if (isExpired) return false;

                    seen.add(signer);

                    return true;
                }
            ) || []
        );
    }, [proposalCandidate]);

    const validSignaturesNouns = useMemo(() => {
        const nounIds: number[] = [];

        validSignatures.forEach((sig) => {
            sig.signer.nounsRepresented.forEach((noun) =>
                nounIds.push(Number(noun.id))
            );
        });

        return nounIds;
    }, [validSignatures]);

    if (proposalCandidate) {
        return (
            <div className={className}>
                <Signatures
                    dict={dict}
                    dream={dream}
                    proposalCandidate={proposalCandidate}
                    validSignatures={validSignatures}
                    validSignaturesNouns={validSignaturesNouns}
                />

                {validSignaturesNouns.length >= 2 && (
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
