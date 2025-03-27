import LilFromSubgraph from '@/utils/dto/Lil/FromSubgraph';
import ListItem from '@/app/[lang]/lils/_components/Lil/List/Item';
import styles from '@/app/[lang]/lils/_styles/lil/list/list.module.css';
import LilFromDB from '@/utils/dto/Lil/FromDB';
import useNormalisedLilList from '@/hooks/useNormalisedLilList';

interface Props extends React.HTMLAttributes<HTMLUListElement> {
    lils: LilFromDB[] | LilFromSubgraph[];
}

export default function LilList({ lils }: Props) {
    const normalisedLilList = useNormalisedLilList(lils);

    return (
        <ul className={styles.list}>
            {normalisedLilList.map((lil) => (
                <li key={lil.id}>
                    <ListItem lil={lil} />
                </li>
            ))}
        </ul>
    );
}
