import { Metadata } from 'next';
import { loadDictionaries } from '@/app/[lang]/dictionaries';
import { Locale, locales } from '@/utils/enums/Locale';
import NounCatalogue from '@/app/[lang]/nouns/_components/Catalogue/Catalogue';
import FilterDisplayProvider from '@/context/FilterDisplay';
import Header from '@/app/_components/Header/Header';
import DictionaryProvider from '@/context/Dictionary';
import { Suspense } from 'react';
import styles from '@/app/[lang]/nouns/_styles/page.module.css';

type Props = Readonly<{
    params: Promise<{ lang: Locale }>;
}>;

export default async function Page({ params }: Props) {
    const { lang } = await params;

    const dict = await loadDictionaries(lang, [
        'common',
        'pages/nouns/dreams/dreams',
        'traits',
    ]);

    return (
        <DictionaryProvider dictionary={dict}>
            <FilterDisplayProvider>
                <Header
                    lang={lang}
                    breadcrumbs={[
                        {
                            label: dict.dreams.breadcrumbs.nouns,
                            href: `/${lang}/nouns`,
                        },
                        {
                            label: dict.dreams.breadcrumbs.dreams,
                            href: `/${lang}/nouns/dreams`,
                        },
                    ]}
                />

                <main className={styles.main}>
                    <Suspense>{/* <NounCatalogue /> */}</Suspense>
                </main>
            </FilterDisplayProvider>
        </DictionaryProvider>
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const lang = (await params).lang;

    const dict = await loadDictionaries(lang, ['pages/nouns/dreams/dreams']);

    const title = dict.dreams.metadata.title;
    const description = dict.dreams.metadata.description;

    return {
        alternates: {
            canonical: `/${lang}/nouns/dreams`,
            languages: locales.reduce((acc, locale) => {
                acc[locale] = `/${locale}/nouns/dreams`;
                return acc;
            }, {} as Record<string, string>),
        },
        description,
        openGraph: {
            description,
            siteName: 'probe.wtf',
            title,
            url: `${process.env.NEXT_PUBLIC_URL}/${lang}/nouns/dreams`,
        },
        title,
        twitter: {
            description,
            title,
        },
    };
}
