import { Dictionary } from '@/app/[lang]/dictionaries';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/dream-date.module.css';
import DreamFromDB from '@/utils/dto/Dream/FromDB';
import LocalisedDateTime from '@/app/_components/LocalisedDateTime';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dict: Dictionary;
    dream: DreamFromDB;
}

export default function Dreamer({ className, dict, dream }: Props) {
    return (
        <div className={className}>
            <dt className={styles.dt}>{dict.dream.details.date}:</dt>

            <dd className={styles.dd}>
                <LocalisedDateTime dateTime={dream.created_at} />
            </dd>
        </div>
    );
}
