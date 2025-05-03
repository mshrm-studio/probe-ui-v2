import { Dictionary } from '@/app/[lang]/dictionaries';
import EthAddress from '@/app/_components/Eth/Address';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/proposal/signatures/list.module.css';
import NounProposalCandidateSignatureFromSubgraph from '@/utils/dto/Noun/ProposalCandidate/Signature/FromSubgraph';
import EtherscanLink from '@/app/_components/EtherscanLink';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dict: Dictionary;
    validSignatures: NounProposalCandidateSignatureFromSubgraph[];
}

export default function SignatureList({ dict, validSignatures }: Props) {
    return (
        <ul className={styles.list}>
            {validSignatures.map((signature, index) => (
                <li key={index}>
                    <EtherscanLink address={signature.signer.id} type="Address">
                        <EthAddress address={signature.signer.id} />
                    </EtherscanLink>{' '}
                    (
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
