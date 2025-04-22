'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import { Section } from '@/app/[lang]/nouns/dreams/[id]/propose/_components/Content';
import styles from '@/app/[lang]/nouns/dreams/[id]/propose/_styles/section/header.module.css';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

interface Props {
    dict: Dictionary;
    section: Section;
    setSection: React.Dispatch<React.SetStateAction<Section>>;
}

export default function SectionHeader({ dict, section, setSection }: Props) {
    const router = useRouter();

    const title = useMemo(() => {
        if (section === 'WriteUp')
            return dict.propose.titleAndDescription.title;

        if (section === 'RequestCompensation')
            return dict.propose.requestCompensation.title;

        return '';
    }, [dict, section]);

    const handleClick = useCallback(() => {
        if (section === 'WriteUp') {
            router.back();
        } else if (section === 'RequestCompensation') {
            setSection('WriteUp');
        }
    }, [section]);

    return (
        <div className={styles.container}>
            <div>
                <button
                    type="button"
                    className={styles.backBtn}
                    onClick={handleClick}
                >
                    <ChevronLeftIcon className={styles.backBtnIcon} />

                    <span>{dict.propose.back}</span>
                </button>
            </div>

            <div>{title}</div>
        </div>
    );
}
