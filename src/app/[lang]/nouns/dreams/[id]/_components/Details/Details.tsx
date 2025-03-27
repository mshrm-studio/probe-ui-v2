import Traits from '@/app/[lang]/nouns/dreams/[id]/_components/Details/Traits/Traits';
import { Dictionary } from '@/app/[lang]/dictionaries';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/details.module.css';
import DreamFromDB from '@/utils/dto/Dream/FromDB';
import Dreamer from '@/app/[lang]/nouns/dreams/[id]/_components/Details/Dreamer';
import DreamDate from '@/app/[lang]/nouns/dreams/[id]/_components/Details/DreamDate';

interface Props {
    dict: Dictionary;
    dream: DreamFromDB;
}

export default function Details({ dict, dream }: Props) {
    return (
        <div className={styles.container}>
            <Dreamer
                dreamer={dream.dreamer}
                dict={dict}
                className={styles.dreamerContainer}
            />

            <DreamDate
                dream={dream}
                dict={dict}
                className={styles.dreamDateContainer}
            />

            <Traits
                dream={dream}
                dict={dict}
                className={styles.traitsContainer}
            />
        </div>
    );
}
