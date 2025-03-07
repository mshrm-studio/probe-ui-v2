import { loadDictionaries } from '@/app/[lang]/dictionaries';
import styles from '@/app/_styles/header/header.module.css';
import { Locale } from '@/utils/enums/Locale';
import Content from '@/app/_components/Header/Content';

import DictionaryProvider from '@/context/Dictionary';
import Breadcrumb from '@/utils/dto/Breadcrumb';

interface GlobalProps {
    lang: Locale;
}

interface LeftAlignedProps extends GlobalProps {
    islandAlign: 'left';
}

interface RightAlignedProps extends GlobalProps {
    breadcrumbs: Breadcrumb[];
    islandAlign?: 'center';
}

type Props = LeftAlignedProps | RightAlignedProps;

export default async function Header(props: Props) {
    const { lang, islandAlign } = props;

    const dict = await loadDictionaries(lang, ['common', 'header', 'traits']);

    return (
        <DictionaryProvider dictionary={dict}>
            <header className={styles.header}>
                <Content
                    dict={dict}
                    breadcrumbs={
                        'breadcrumbs' in props ? props.breadcrumbs : []
                    }
                    islandAlign={islandAlign || 'center'}
                />
            </header>
        </DictionaryProvider>
    );
}
