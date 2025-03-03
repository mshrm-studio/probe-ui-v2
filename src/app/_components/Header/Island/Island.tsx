import Probe from '@/app/_components/Header/Island/Probe';
import Auth from '@/app/_components/Header/Island/Auth';
import Filters from '@/app/_components/Header/Island/Filters';
import Search from '@/app/_components/Header/Island/Search';
import { Dictionary } from '@/app/[lang]/dictionaries';
import styles from '@/app/_styles/header/island/island.module.css';

interface Props {
    dict: Dictionary;
    isCatalogue: boolean;
}

export default function HeaderIsland({ dict, isCatalogue }: Props) {
    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <Probe dict={dict} />
                </li>

                <li className={styles.listItem}>
                    <Search dict={dict} />
                </li>

                {isCatalogue && (
                    <li className={styles.listItem}>
                        <Filters dict={dict} />
                    </li>
                )}

                <li className={styles.listItem}>
                    <Auth dict={dict} />
                </li>
            </ul>
        </nav>
    );
}
