import NounFromSubgraph from '@/utils/dto/Noun/FromSubgraph';
import ListItem from '@/app/_components/Noun/List/Item';
import styles from '@/app/_styles/noun/list/list.module.css';

interface Props extends React.HTMLAttributes<HTMLUListElement> {
    nouns: NounFromSubgraph[];
}

export default function NounList({ nouns }: Props) {
    return (
        <ul className={styles.list}>
            {nouns.map((noun) => (
                <li key={noun.id}>
                    <ListItem noun={noun} />
                </li>
            ))}
        </ul>
    );
}
