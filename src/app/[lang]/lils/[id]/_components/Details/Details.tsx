import LilFromDB from '@/utils/dto/Lil/FromDB';
import Colors from '@/app/[lang]/lils/[id]/_components/Details/Colors';
import Traits from '@/app/[lang]/lils/[id]/_components/Details/Traits/Traits';
import { Dictionary } from '@/app/[lang]/dictionaries';
import styles from '@/app/[lang]/lils/[id]/_styles/details/details.module.css';

interface Props {
    dict: Dictionary;
    lil: LilFromDB;
}

export default function Details({ dict, lil }: Props) {
    return (
        <div className={styles.container}>
            {lil && (
                <Colors
                    lil={lil}
                    dict={dict}
                    className={styles.colorsContainer}
                />
            )}

            <Traits lil={lil} dict={dict} className={styles.traitsContainer} />
        </div>
    );
}
