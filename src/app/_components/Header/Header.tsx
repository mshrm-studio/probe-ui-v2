import { loadDictionaries } from '@/app/[lang]/dictionaries';
import styles from '@/app/_styles/header/header.module.css';
import { Locale } from '@/utils/enums/Locale';
import Content from '@/app/_components/Header/Content';

import DictionaryProvider from '@/context/Dictionary';
import Breadcrumb from '@/utils/dto/Breadcrumb';

interface Props {
    breadcrumbs: Breadcrumb[];
    lang: Locale;
}

export default async function Header({ breadcrumbs, lang }: Props) {
    const dict = await loadDictionaries(lang, ['common', 'header', 'traits']);

    return (
        <DictionaryProvider dictionary={dict}>
            <header className={styles.header}>
                <Content dict={dict} breadcrumbs={breadcrumbs} />
            </header>
        </DictionaryProvider>
    );
}
