import Probe from '@/app/_components/Header/Island/Probe';
import Filters from '@/app/_components/Header/Island/Filters';
import Language from '@/app/_components/Header/Island/Language';
import Search from '@/app/_components/Header/Island/Search';
import { Dictionary } from '@/app/[lang]/dictionaries';
import styles from '@/app/_styles/header/island/island.module.css';
import dynamic from 'next/dynamic';
const Auth = dynamic(() => import('@/app/_components/Header/Island/Auth'), {
    ssr: false,
});

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
                    <Language dict={dict} />
                </li>

                <li className={styles.listItem}>
                    <Auth dict={dict} />
                </li>
            </ul>
        </nav>
    );
}
