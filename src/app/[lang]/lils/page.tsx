import { Metadata } from 'next';
import { loadDictionaries } from '@/app/[lang]/dictionaries';
import { Locale, locales } from '@/utils/enums/Locale';
import LilCatalogue from '@/app/[lang]/lils/_components/Catalogue/Catalogue';
import FilterDisplayProvider from '@/context/FilterDisplay';
import Header from '@/app/_components/Header/Header';
import DictionaryProvider from '@/context/Dictionary';
import { Suspense } from 'react';
import styles from '@/app/[lang]/lils/_styles/page.module.css';

type Props = Readonly<{
    params: Promise<{ lang: Locale }>;
}>;

export default async function Page({ params }: Props) {
    const { lang } = await params;

    const dict = await loadDictionaries(lang, [
        'common',
        'pages/lils/lils',
        'traits',
    ]);

    return (
        <DictionaryProvider dictionary={dict}>
            <FilterDisplayProvider>
                <Header
                    lang={lang}
                    breadcrumbs={[
                        {
                            label: dict.lils.breadcrumbs.lils,
                            href: '/lils',
                        },
                    ]}
                />

                <main className={styles.main}>
                    <Suspense>
                        <LilCatalogue />
                    </Suspense>
                </main>
            </FilterDisplayProvider>
        </DictionaryProvider>
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;

    const dict = await loadDictionaries(lang, ['pages/lils/lils']);

    const title = dict.lils.metadata.title;
    const description = dict.lils.metadata.description;

    return {
        alternates: {
            canonical: `/${lang}/lils`,
            languages: locales.reduce((acc, locale) => {
                acc[locale] = `/${locale}/lils`;
                return acc;
            }, {} as Record<string, string>),
        },
        description,
        openGraph: {
            description,
            siteName: 'probe.wtf',
            title,
            url: `${process.env.NEXT_PUBLIC_URL}/${lang}/lils`,
        },
        title,
        twitter: {
            description,
            title,
        },
    };
}
