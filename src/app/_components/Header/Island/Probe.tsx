import { Dictionary } from '@/app/[lang]/dictionaries';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import Link from 'next/link';
import Image from '@/app/_components/Image';
import popoverStyles from '@/app/_styles/header/island/popover.module.css';
import styles from '@/app/_styles/header/island/probe.module.css';
import clsx from 'clsx';

interface Props {
    dict: Dictionary;
}

export default function HeaderProbe({ dict }: Props) {
    return (
        <Popover className="relative">
            <PopoverButton className={popoverStyles.button}>
                <Image
                    src="header/probe.svg"
                    alt={dict.header.probe.imgAlt}
                    height={15}
                    width={15}
                />
            </PopoverButton>

            <PopoverPanel
                className={clsx(popoverStyles.panel, styles.popoverPanel)}
            >
                <Link className={styles.link} href="/nouns">
                    {dict.header.probe.nounsLinkText}
                </Link>

                <Link className={styles.link} href="/lils">
                    {dict.header.probe.lilsLinkText}
                </Link>

                <Link className={styles.link} href="/nouns/dreams">
                    {dict.header.probe.dreamsLinkText}
                </Link>
            </PopoverPanel>
        </Popover>
    );
}
