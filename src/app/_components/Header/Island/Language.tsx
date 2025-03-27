'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import popoverStyles from '@/app/_styles/header/island/popover.module.css';
import styles from '@/app/_styles/header/island/auth.module.css';
import clsx from 'clsx';
import { LanguageIcon } from '@heroicons/react/20/solid';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Locale } from '@/utils/enums/Locale';
import { useCallback } from 'react';

interface Props {
    dict: Dictionary;
}

export default function HeaderLanguage({ dict }: Props) {
    const { lang } = useParams();
    const pathname = usePathname();
    const router = useRouter();

    const setLocaleCookieAndNavigate = useCallback(
        (newLocale: Locale) => {
            document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000;`;
            router.push(pathname.replace(String(lang), newLocale));
            router.refresh();
        },
        [lang, pathname]
    );

    return (
        <Popover className="relative">
            <PopoverButton className={popoverStyles.button}>
                <span className="sr-only">
                    {dict.header.language.showLanguageMenu}
                </span>

                <LanguageIcon className="h-4 w-4" />
            </PopoverButton>

            <PopoverPanel
                className={clsx(popoverStyles.panel, styles.popoverPanel)}
            >
                <ul className="space-y-4">
                    <li>
                        <button
                            type="button"
                            onClick={() =>
                                setLocaleCookieAndNavigate(
                                    Locale.EnglishUnitedStates
                                )
                            }
                        >
                            English
                        </button>
                    </li>

                    <li>
                        <button
                            type="button"
                            onClick={() =>
                                setLocaleCookieAndNavigate(
                                    Locale.ChineseSimplified
                                )
                            }
                        >
                            简体中文
                        </button>
                    </li>

                    <li>
                        <button
                            type="button"
                            onClick={() =>
                                setLocaleCookieAndNavigate(
                                    Locale.ChineseTraditional
                                )
                            }
                        >
                            繁體中文
                        </button>
                    </li>
                </ul>
            </PopoverPanel>
        </Popover>
    );
}
