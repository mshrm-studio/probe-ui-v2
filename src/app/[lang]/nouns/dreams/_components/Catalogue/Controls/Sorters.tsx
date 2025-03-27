'use client';

import { isSortMethod, SortMethod } from '@/utils/enums/SortMethod';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import styles from '@/app/[lang]/nouns/dreams/_styles/catalogue/controls/sorters.module.css';
import clsx from 'clsx';
import useDictionary from '@/hooks/useDictionary';
import {
    DreamSortProperty,
    isDreamSortProperty,
} from '@/utils/enums/Dream/SortProperty';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function DreamControlsSorters({ className }: Props) {
    const dict = useDictionary();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [sortMethod, setSortMethod] = useState<string | null>(
        searchParams.get('sort_method')
    );

    const [sortProperty, setSortProperty] = useState<string | null>(
        searchParams.get('sort_property')
    );

    useEffect(() => {
        setSortMethod(searchParams.get('sort_method'));
        setSortProperty(searchParams.get('sort_property'));
    }, [searchParams]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (isSortMethod(sortMethod)) {
            params.set('sort_method', sortMethod);
        } else {
            params.delete('sort_method');
        }

        if (isDreamSortProperty(sortProperty)) {
            params.set('sort_property', sortProperty);
        } else {
            params.delete('sort_property');
        }

        router.push(pathname + '?' + params.toString());
    }, [sortMethod, sortProperty]);

    const sortOptions = useMemo(() => {
        const idLabel =
            sortProperty !== DreamSortProperty.ID
                ? dict.dreams.catalogue.controls.sorters.mostRecent
                : sortMethod === SortMethod.Ascending
                ? dict.dreams.catalogue.controls.sorters.mostRecent
                : dict.dreams.catalogue.controls.sorters.oldest;

        return [
            {
                label: idLabel,
                property: 'id',
                method:
                    idLabel ===
                    dict.dreams.catalogue.controls.sorters.mostRecent
                        ? SortMethod.Descending
                        : SortMethod.Ascending,
            },
        ];
    }, [searchParams]);

    function resetFilters() {
        router.replace(pathname);
    }

    return (
        <div className={clsx(className, styles.container)}>
            <div>
                <button
                    type="button"
                    className={styles.button}
                    onClick={resetFilters}
                >
                    <span>{dict.dreams.catalogue.controls.reset}</span>

                    <ChevronRightIcon className={styles.buttonIcon} />
                </button>
            </div>

            {sortOptions.map((option) => (
                <div key={option.property} className={styles.optionContainer}>
                    <button
                        type="button"
                        className={styles.button}
                        onClick={() => {
                            setSortMethod(option.method);
                            setSortProperty(option.property);
                        }}
                    >
                        <span>{option.label}</span>

                        <ChevronRightIcon className={styles.buttonIcon} />
                    </button>
                </div>
            ))}
        </div>
    );
}
