import { Dictionary } from '@/app/[lang]/dictionaries';
import EthAddress from '@/app/_components/Eth/Address';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/proposal/signatures/list.module.css';
import NounProposalCandidateSignatureFromSubgraph from '@/utils/dto/Noun/ProposalCandidate/Signature/FromSubgraph';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dict: Dictionary;
    validSignatures: NounProposalCandidateSignatureFromSubgraph[];
}

export default function SignatureList({ dict, validSignatures }: Props) {
    return (
        <ul className={styles.list}>
            {validSignatures.map((signature, index) => (
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
            ))}
        </ul>
    );
}
