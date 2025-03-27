import ListItem from '@/app/[lang]/nouns/dreams/_components/Dream/List/Item';
import styles from '@/app/[lang]/nouns/dreams/_styles/dream/list/list.module.css';
import DreamFromDB from '@/utils/dto/Dream/FromDB';

interface Props extends React.HTMLAttributes<HTMLUListElement> {
    dreams: DreamFromDB[];
}

export default function DreamList({ dreams }: Props) {
    return (
        <ul className={styles.list}>
            {dreams.map((dream) => (
                <li key={dream.id}>
                    <ListItem dream={dream} />
                </li>
            ))}
        </ul>
    );
}
