import NounFromSubgraph from '@/utils/dto/Noun/FromSubgraph';
import ListItem from '@/app/_components/Noun/List/Item';
import styles from '@/app/_styles/noun/list/list.module.css';
import NounFromDB from '@/utils/dto/Noun/FromDB';

interface Props extends React.HTMLAttributes<HTMLUListElement> {
    nouns: NounFromDB[] | NounFromSubgraph[];
}

export default function NounList({ nouns }: Props) {
    return (
        <ul className={styles.list}>
            {nouns.map((noun, idx) => (
                <li key={idx}>
                    <ListItem noun={noun} />
                </li>
            ))}
        </ul>
    );
}
