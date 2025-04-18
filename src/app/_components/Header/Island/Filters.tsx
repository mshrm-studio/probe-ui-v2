'use client';

import React, { useContext } from 'react';
import Image from '@/app/_components/Image';
import { FilterDisplayContext } from '@/context/FilterDisplay';
import { Dictionary } from '@/app/[lang]/dictionaries';
import popoverStyles from '@/app/_styles/header/island/popover.module.css';

interface Props extends React.HTMLAttributes<HTMLLIElement> {
    dict: Dictionary;
}

export default function HeaderFilters({ dict }: Props) {
    const { show, setShow } = useContext(FilterDisplayContext);

    return (
        <button
            type="button"
            className={popoverStyles.button}
            onClick={() => setShow((prev) => !prev)}
        >
            <span className="sr-only">{dict.header.filters.showFilters}</span>

            <Image
                src={show ? 'header/filter-active.svg' : 'header/filter.svg'}
                alt={dict.header.filters.imgAlt}
                className={popoverStyles.imgContainer}
                objectFit="contain"
                sizes="15px"
            />
        </button>
    );
}
