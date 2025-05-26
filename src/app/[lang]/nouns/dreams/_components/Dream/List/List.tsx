import { Dictionary } from '@/app/[lang]/dictionaries';
import ListItem from '@/app/[lang]/nouns/dreams/_components/Dream/List/Item';
import styles from '@/app/[lang]/nouns/dreams/_styles/dream/list/list.module.css';
import { NounProposalFromSubgraphWithCandidateSlug } from '@/context/Proposals';
import DreamFromDB from '@/utils/dto/Dream/FromDB';

interface Props extends React.HTMLAttributes<HTMLUListElement> {
    activeProposals?: NounProposalFromSubgraphWithCandidateSlug[];
    dict: Dictionary;
    dreams: DreamFromDB[];
}

export default function DreamList({ activeProposals, dict, dreams }: Props) {
    return (
        <ul className={styles.list}>
            {dreams.map((dream) => (
                <li key={dream.id}>
                    <ListItem
                        activeProposal={
                            Array.isArray(activeProposals)
                                ? activeProposals
                                      .filter(
                                          (ap) =>
                                              ap.latestBlockAfterProposalEndBlock
                                      )
                                      .map((ap) => ap.candidateSlug)
                                      .includes(`probe-dream-${dream.id}`)
                                : false
                        }
                        dict={dict}
                        dream={dream}
                    />
                </li>
            ))}
        </ul>
    );
}
