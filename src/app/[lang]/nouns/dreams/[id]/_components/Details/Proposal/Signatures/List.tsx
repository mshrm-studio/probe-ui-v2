import { Dictionary } from '@/app/[lang]/dictionaries';
import EthAddress from '@/app/_components/Eth/Address';
import NounProposalCandidateFromSubgraph from '@/utils/dto/Noun/ProposalCandidate/FromSubgraph';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/proposal/signatures/list.module.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dict: Dictionary;
    proposalCandidate: NounProposalCandidateFromSubgraph;
}

export default function SignatureList({ dict, proposalCandidate }: Props) {
    return (
        <ul className={styles.list}>
            {proposalCandidate.latestVersion.content.contentSignatures.map(
                (signature, index) => (
                    <li key={index}>
                        <EthAddress address={signature.signer.id} /> (
                        {signature.signer.nounsRepresented.length === 1
                            ? dict.dream.details.nounRepresented.replace(
                                  ':number',
                                  '1'
                              )
                            : dict.dream.details.nounsRepresented.replace(
                                  ':number',
                                  signature.signer.nounsRepresented.length
                              )}
                        )
                    </li>
                )
            )}
        </ul>
    );
}
