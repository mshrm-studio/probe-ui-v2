'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import Image from '@/app/_components/Image';
import popoverStyles from '@/app/_styles/header/island/popover.module.css';
import styles from '@/app/_styles/header/island/search.module.css';
import clsx from 'clsx';
import SelectNounTrait from '@/app/[lang]/nouns/_components/Select/Noun/Trait';
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
    dict: Dictionary;
}

export default function HeaderSearch({ dict }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState<string | null>(
        searchParams.get('search') || ''
    );

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (search) {
            params.set('search', search);
        } else {
            params.delete('search');
        }

        router.push(pathname + '?' + params.toString());
    }, [search]);

    const redirect = useCallback(() => {
        if (pathname.includes('nouns/')) {
            router.push('/nouns');
        } else if (pathname.includes('lils/')) {
            router.push('/lils');
        }
    }, [pathname]);

    if (pathname.includes('nouns/') || pathname.includes('lils/')) {
        return (
            <button
                type="button"
                className={popoverStyles.button}
                onClick={redirect}
            >
                <span className="sr-only">
                    {dict.header.search.showSearchBar}
                </span>

                <Image
                    className={popoverStyles.imgContainer}
                    src="header/search.svg"
                    alt={dict.header.search.imgAlt}
                    objectFit="contain"
                    sizes="15px"
                />
            </button>
        );
    }

    return (
        <Popover className="relative">
            <PopoverButton className={popoverStyles.button}>
                <span className="sr-only">
                    {dict.header.search.showSearchBar}
                </span>

                <Image
                    className={popoverStyles.imgContainer}
                    src="header/search.svg"
                    alt={dict.header.search.imgAlt}
                    objectFit="contain"
                    sizes="15px"
                />
            </PopoverButton>

            <PopoverPanel
                className={clsx(popoverStyles.panel, styles.popoverPanel)}
            >
                <SelectNounTrait selected={search} setSelected={setSearch} />
            </PopoverPanel>
        </Popover>
    );
}
