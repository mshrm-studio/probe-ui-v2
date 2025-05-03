'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/proposal/signatures/signatures.module.css';
import NounProposalCandidateFromSubgraph from '@/utils/dto/Noun/ProposalCandidate/FromSubgraph';
import SignatureList from '@/app/[lang]/nouns/dreams/[id]/_components/Details/Proposal/Signatures/List';
import AddSignature from '@/app/[lang]/nouns/dreams/[id]/_components/Details/Proposal/Signatures/Add';
import NounProposalCandidateSignatureFromSubgraph from '@/utils/dto/Noun/ProposalCandidate/Signature/FromSubgraph';
import { DreamFromDBWithCustomTrait } from '@/utils/dto/Dream/FromDB';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dict: Dictionary;
    dream: DreamFromDBWithCustomTrait;
    proposalCandidate: NounProposalCandidateFromSubgraph;
    validSignatures: NounProposalCandidateSignatureFromSubgraph[];
}

export default function Proposal({
    dict,
    dream,
    proposalCandidate,
    validSignatures,
}: Props) {
    return (
        <div>
            <div className={styles.heading}>
                {dict.dream.details.sponsors} ({validSignatures.length})
            </div>

            <SignatureList dict={dict} validSignatures={validSignatures} />

            <AddSignature
                className={styles.addSignatureContainer}
                dict={dict}
                dream={dream}
                proposalCandidate={proposalCandidate}
            />
        </div>
    );
}
