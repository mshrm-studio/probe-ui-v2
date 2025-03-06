'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import Image from '@/app/_components/Image';
import popoverStyles from '@/app/_styles/header/island/popover.module.css';
import styles from '@/app/_styles/header/island/search.module.css';
import clsx from 'clsx';
import SelectNounTrait from '@/app/[lang]/nouns/_components/Select/Noun/Trait';
import { useState } from 'react';

interface Props {
    dict: Dictionary;
}

export default function HeaderSearch({ dict }: Props) {
    const [search, setSearch] = useState<string | null>('');

    return (
        <Popover className="relative">
            <PopoverButton className={popoverStyles.button}>
                <span className="sr-only">
                    {dict.header.search.showSearchBar}
                </span>

                <Image
                    src="header/search.svg"
                    alt={dict.header.search.imgAlt}
                    height={15}
                    width={15}
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
