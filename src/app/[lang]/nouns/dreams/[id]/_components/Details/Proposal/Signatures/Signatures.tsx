'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/proposal/signatures/signatures.module.css';
import NounProposalCandidateFromSubgraph from '@/utils/dto/Noun/Proposal/Candidate/FromSubgraph';
import SignatureList from '@/app/[lang]/nouns/dreams/[id]/_components/Details/Proposal/Signatures/List';
import AddSignature from '@/app/[lang]/nouns/dreams/[id]/_components/Details/Proposal/Signatures/Add';
import NounProposalCandidateSignatureFromSubgraph from '@/utils/dto/Noun/Proposal/Candidate/Signature/FromSubgraph';
import { DreamFromDBWithCustomTrait } from '@/utils/dto/Dream/FromDB';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dict: Dictionary;
    dream: DreamFromDBWithCustomTrait;
    proposalCandidate: NounProposalCandidateFromSubgraph;
    validSignatures: NounProposalCandidateSignatureFromSubgraph[];
    validSignaturesNouns: number[];
}

export default function Proposal({
    dict,
    dream,
    proposalCandidate,
    validSignatures,
    validSignaturesNouns,
}: Props) {
    return (
        <div
            data-valid-signatures={validSignatures.length}
            data-valid-signatures-nouns={validSignaturesNouns.length}
        >
            <div className={styles.heading}>
                {dict.dream.details.sponsors} ({validSignatures.length})
            </div>

            <SignatureList dict={dict} validSignatures={validSignatures} />

            {validSignaturesNouns.length < 4 && (
                <AddSignature
                    className={styles.addSignatureContainer}
                    dict={dict}
                    dream={dream}
                    proposalCandidate={proposalCandidate}
                />
            )}
        </div>
    );
}
