import { Dictionary } from '@/app/[lang]/dictionaries';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/proposal/signatures/signatures.module.css';
import NounProposalCandidateFromSubgraph from '@/utils/dto/Noun/ProposalCandidate/FromSubgraph';
import SignatureList from '@/app/[lang]/nouns/dreams/[id]/_components/Details/Proposal/Signatures/List';
import AddSignature from '@/app/[lang]/nouns/dreams/[id]/_components/Details/Proposal/Signatures/Add';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    proposalCandidate: NounProposalCandidateFromSubgraph;
    dict: Dictionary;
}

export default function Proposal({ proposalCandidate, dict }: Props) {
    return (
        <div>
            <div className={styles.heading}>
                {dict.dream.details.sponsors} (
                {
                    proposalCandidate.latestVersion.content.contentSignatures
                        .length
                }
                )
            </div>

            <SignatureList dict={dict} proposalCandidate={proposalCandidate} />

            {proposalCandidate.latestVersion.content.contentSignatures.length <
                2 && (
                <AddSignature
                    className={styles.addSignatureContainer}
                    dict={dict}
                    proposalCandidate={proposalCandidate}
                />
            )}
        </div>
    );
}
