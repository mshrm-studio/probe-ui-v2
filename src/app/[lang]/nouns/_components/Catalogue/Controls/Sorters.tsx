'use client';

import {
    isNounSortProperty,
    NounSortProperty,
} from '@/utils/enums/Noun/SortProperty';
import { isSortMethod, SortMethod } from '@/utils/enums/SortMethod';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import styles from '@/app/[lang]/nouns/_styles/catalogue/controls/sorters.module.css';
import clsx from 'clsx';
import useDictionary from '@/hooks/useDictionary';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function NounsControlsSorters({ className }: Props) {
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

        if (isNounSortProperty(sortProperty)) {
            params.set('sort_property', sortProperty);
        } else {
            params.delete('sort_property');
        }

        router.push(pathname + '?' + params.toString());
    }, [sortMethod, sortProperty]);

    const sortOptions = useMemo(() => {
        const areaLabel =
            sortProperty !== NounSortProperty.Area
                ? dict.nouns.catalogue.controls.sorters.biggest
                : sortMethod === SortMethod.Ascending
                ? dict.nouns.catalogue.controls.sorters.biggest
                : dict.nouns.catalogue.controls.sorters.smallest;

        const colorfulnessLabel =
            sortProperty !== NounSortProperty.Colorfulness
                ? dict.nouns.catalogue.controls.sorters.mostColorful
                : sortMethod === SortMethod.Ascending
                ? dict.nouns.catalogue.controls.sorters.mostColorful
                : dict.nouns.catalogue.controls.sorters.leastColorful;

        const tokenIdLabel =
            sortProperty !== NounSortProperty.TokenID
                ? dict.nouns.catalogue.controls.sorters.mostRecent
                : sortMethod === SortMethod.Ascending
                ? dict.nouns.catalogue.controls.sorters.mostRecent
                : dict.nouns.catalogue.controls.sorters.oldest;

        const weightLabel =
            sortProperty !== NounSortProperty.Weight
                ? dict.nouns.catalogue.controls.sorters.brightest
                : sortMethod === SortMethod.Ascending
                ? dict.nouns.catalogue.controls.sorters.brightest
                : dict.nouns.catalogue.controls.sorters.darkest;

        return [
            {
                label: areaLabel,
                property: 'area',
                method:
                    areaLabel === dict.nouns.catalogue.controls.sorters.biggest
                        ? SortMethod.Descending
                        : SortMethod.Ascending,
            },
            {
                label: colorfulnessLabel,
                property: 'colorfulness',
                method:
                    colorfulnessLabel ===
                    dict.nouns.catalogue.controls.sorters.mostColorful
                        ? SortMethod.Descending
                        : SortMethod.Ascending,
            },
            {
                label: tokenIdLabel,
                property: 'token_id',
                method:
                    tokenIdLabel ===
                    dict.nouns.catalogue.controls.sorters.mostRecent
                        ? SortMethod.Descending
                        : SortMethod.Ascending,
            },
            {
                label: weightLabel,
                property: 'weight',
                method:
                    weightLabel ===
                    dict.nouns.catalogue.controls.sorters.brightest
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
                    <span>{dict.nouns.catalogue.controls.reset}</span>

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
