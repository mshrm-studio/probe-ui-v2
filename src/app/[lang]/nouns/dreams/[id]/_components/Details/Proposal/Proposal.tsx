'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import { ProposalContext } from '@/context/Proposal';
import { DreamFromDBWithCustomTrait } from '@/utils/dto/Dream/FromDB';
import { useContext, useMemo } from 'react';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/proposal/proposal.module.css';
import Signatures from '@/app/[lang]/nouns/dreams/[id]/_components/Details/Proposal/Signatures/Signatures';
import Promote from '@/app/[lang]/nouns/dreams/[id]/_components/Details/Proposal/Promote';
import CastVote from '@/app/[lang]/nouns/dreams/[id]/_components/Details/Proposal/CastVote/CastVote';
import DaoProxyProvider from '@/context/DaoProxy';
import ProposalPending from '@/app/[lang]/nouns/dreams/[id]/_components/Details/Proposal/Pending';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dict: Dictionary;
    dream: DreamFromDBWithCustomTrait;
}

export default function Proposal({ className, dict, dream }: Props) {
    const { proposalCandidate, proposal } = useContext(ProposalContext);

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
                {proposal === undefined && (
                    <Signatures
                        dict={dict}
                        dream={dream}
                        proposalCandidate={proposalCandidate}
                        validSignatures={validSignatures}
                        validSignaturesNouns={validSignaturesNouns}
                    />
                )}

                <DaoProxyProvider>
                    {proposal?.status === 'CANCELLED' && (
                        <div className={styles.proposalStatusContainer}>
                            <p>{dict.dream.details.proposalCancelled}</p>
                        </div>
                    )}

                    {proposal?.status === 'DEFEATED' && (
                        <div className={styles.proposalStatusContainer}>
                            <p>{dict.dream.details.proposalDefeated}</p>
                        </div>
                    )}

                    {proposal?.status === 'EXECUTED' && (
                        <div className={styles.proposalStatusContainer}>
                            <p>{dict.dream.details.proposalExecuted}</p>
                        </div>
                    )}

                    {proposal?.status === 'PENDING' && (
                        <div className={styles.proposalStatusContainer}>
                            <ProposalPending dict={dict} proposal={proposal} />
                        </div>
                    )}

                    {proposal?.status === 'SUCCEEDED' && (
                        <div className={styles.proposalStatusContainer}>
                            <p>{dict.dream.details.proposalSucceeded}</p>
                        </div>
                    )}

                    {proposal?.status === 'QUEUED' && (
                        <div className={styles.proposalStatusContainer}>
                            <p>{dict.dream.details.proposalQueued}</p>
                        </div>
                    )}

                    {proposal?.status === 'VETOED' && (
                        <div className={styles.proposalStatusContainer}>
                            <p>{dict.dream.details.proposalVetoed}</p>
                        </div>
                    )}

                    {proposal?.status === 'ACTIVE' && (
                        <CastVote
                            className={styles.castVoteContainer}
                            dict={dict}
                        />
                    )}

                    {proposal === undefined && (
                        <Promote
                            className={styles.promoteContainer}
                            dict={dict}
                            proposalCandidate={proposalCandidate}
                            validSignaturesNouns={validSignaturesNouns}
                        />
                    )}
                </DaoProxyProvider>
            </div>
        );
    }

    return null;
}
