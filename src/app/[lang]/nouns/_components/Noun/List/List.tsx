import NounFromSubgraph from '@/utils/dto/Noun/FromSubgraph';
import ListItem from '@/app/[lang]/nouns/_components/Noun/List/Item';
import styles from '@/app/[lang]/nouns/_styles/noun/list/list.module.css';
import NounFromDB from '@/utils/dto/Noun/FromDB';
import useNormalisedNounList from '@/hooks/useNormalisedNounList';

interface Props extends React.HTMLAttributes<HTMLUListElement> {
    nouns: NounFromDB[] | NounFromSubgraph[];
}

export default function NounList({ nouns }: Props) {
    const normalisedNounList = useNormalisedNounList(nouns);

    return (
        <ul className={styles.list}>
            {normalisedNounList.map((noun) => (
                <li key={noun.id}>
                    <ListItem noun={noun} />
                </li>
            ))}
        </ul>
    );
}
