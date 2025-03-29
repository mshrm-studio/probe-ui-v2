import LilFromDB from '@/utils/dto/Lil/FromDB';
import Colors from '@/app/[lang]/lils/[id]/_components/Details/Colors';
import Traits from '@/app/[lang]/lils/[id]/_components/Details/Traits/Traits';
import { Dictionary } from '@/app/[lang]/dictionaries';
import styles from '@/app/[lang]/lils/[id]/_styles/details/details.module.css';
import LocalisedNumber from '@/app/_components/LocalisedNumber';

interface Props {
    dict: Dictionary;
    lil: LilFromDB;
}

export default function Details({ dict, lil }: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.headingContainer}>
                <h1 className={styles.heading}>
                    {dict.lil.details.lil}{' '}
                    <LocalisedNumber
                        number={lil.token_id}
                        removeCommasAndPeriods
                    />
                </h1>
            </div>

            <Colors lil={lil} dict={dict} className={styles.colorsContainer} />

            <Traits lil={lil} dict={dict} className={styles.traitsContainer} />
        </div>
    );
}
