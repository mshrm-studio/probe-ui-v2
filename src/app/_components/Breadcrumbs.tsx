'use client';

import styles from '@/app/_styles/breadcrumbs.module.css';
import Breadcrumb from '@/utils/dto/Breadcrumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props extends React.HTMLAttributes<HTMLElement> {
    breadcrumbs: Breadcrumb[];
}

export default function Breadcrumbs({ breadcrumbs, className }: Props) {
    const pathname = usePathname();

    return (
        <nav className={className}>
            <ul className={styles.list}>
                {breadcrumbs.map((breadcrumb, index) => (
                    <li key={index} className={styles.listItem}>
                        <Link
                            href={breadcrumb.href}
                            className={styles.link}
                            data-active={pathname === breadcrumb.href}
                        >
                            {breadcrumb.label}
                        </Link>

                        {index !== breadcrumbs.length - 1 && (
                            <span className={styles.divider}>/</span>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
