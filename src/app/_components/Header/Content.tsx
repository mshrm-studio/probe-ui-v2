'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import { locales } from '@/utils/enums/Locale';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import Island from '@/app/_components/Header/Island/Island';
import Breadcrumb from '@/utils/dto/Breadcrumb';
import Breadcrumbs from '@/app/_components/Breadcrumbs';
import CopyToClipboard from '@/app/_components/CopyToClipboard';
import styles from '@/app/_styles/header/content.module.css';

interface Props {
    breadcrumbs: Breadcrumb[];
    dict: Dictionary;
}

export default function HeaderContent({ breadcrumbs, dict }: Props) {
    const pathname = usePathname();

    const filterablePaths = ['/nouns', '/nouns/dreams', '/lils'];

    const localizedFilterablePaths = filterablePaths.flatMap((path) =>
        locales.map((locale) => `/${locale}${path}`)
    );

    const isCatalogue = useMemo(
        () => localizedFilterablePaths.includes(pathname),
        [pathname]
    );

    return (
        <div className={styles.container}>
            <Breadcrumbs
                breadcrumbs={breadcrumbs}
                className={styles.breadcrumbsContainer}
            />

            <Island dict={dict} isCatalogue={isCatalogue} />

            <div className={styles.copyContainer}>
                <CopyToClipboard content="⌐◨-◨">⌐◨-◨</CopyToClipboard>
            </div>
        </div>
    );
}
