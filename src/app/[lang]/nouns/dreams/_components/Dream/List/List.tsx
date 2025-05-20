import ListItem from '@/app/[lang]/nouns/dreams/_components/Dream/List/Item';
import styles from '@/app/[lang]/nouns/dreams/_styles/dream/list/list.module.css';
import DreamFromDB from '@/utils/dto/Dream/FromDB';

interface Props extends React.HTMLAttributes<HTMLUListElement> {
    activeProposals?: { id: string; candidateSlug: string }[];
    dreams: DreamFromDB[];
}

export default function DreamList({ activeProposals, dreams }: Props) {
    return (
        <ul className={styles.list}>
            {dreams.map((dream) => (
                <li key={dream.id}>
                    <ListItem
                        activeProposal={
                            Array.isArray(activeProposals)
                                ? activeProposals
                                      .map((proposal) => proposal.candidateSlug)
                                      .includes(`probe-dream-${dream.id}`)
                                : false
                        }
                        dream={dream}
                    />
                </li>
            ))}
        </ul>
    );
}
