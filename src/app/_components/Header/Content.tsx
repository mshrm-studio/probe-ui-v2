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
import Link from 'next/link';

interface GlobalProps {
    dict: Dictionary;
}

interface LeftAlignedProps extends GlobalProps {
    islandAlign: 'left';
}

interface RightAlignedProps extends GlobalProps {
    breadcrumbs: Breadcrumb[];
    islandAlign: 'center';
}

type Props = LeftAlignedProps | RightAlignedProps;

export default function HeaderContent(props: Props) {
    const { dict, islandAlign } = props;

    const pathname = usePathname();

    const filterablePaths = [
        '/nouns',
        '/nouns/dreams',
        '/nouns/proposals',
        '/lils',
    ];

    const localizedFilterablePaths = filterablePaths.flatMap((path) =>
        locales.map((locale) => `/${locale}${path}`)
    );

    const isCatalogue = useMemo(
        () => localizedFilterablePaths.includes(pathname),
        [pathname]
    );

    const exploreLink = useMemo(() => {
        if (isCatalogue) return null;
        if (pathname.includes('/nouns/dreams')) return '/nouns/dreams';
        if (pathname.includes('/nouns/proposals')) return '/nouns/proposals';
        if (pathname.includes('/nouns')) return '/nouns';
        if (pathname.includes('/lils')) return '/lils';
        return null;
    }, [isCatalogue, pathname]);

    return (
        <div
            className={styles.container}
            aria-colcount={islandAlign === 'center' ? 3 : 2}
        >
            {islandAlign === 'center' && (
                <div className={styles.breadcrumbsContainer}>
                    <Breadcrumbs breadcrumbs={props.breadcrumbs} />
                </div>
            )}

            <div className={styles.islandContainer}>
                <Island dict={dict} isCatalogue={isCatalogue} />
            </div>

            {exploreLink ? (
                <div className={styles.exploreContainer}>
                    <Link href={exploreLink}>{dict.header.explore}</Link>
                </div>
            ) : (
                <div className={styles.copyContainer}>
                    <CopyToClipboard content="⌐◨-◨">⌐◨-◨</CopyToClipboard>
                </div>
            )}
        </div>
    );
}
