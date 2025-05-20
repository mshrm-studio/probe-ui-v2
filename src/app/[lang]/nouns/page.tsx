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
        'pages/nouns/nouns',
        'traits',
    ]);

    return (
        <DictionaryProvider dictionary={dict}>
            <FilterDisplayProvider>
                <Header
                    lang={lang}
                    breadcrumbs={[
                        {
                            label: dict.nouns.breadcrumbs.nouns,
                            href: '/nouns',
                        },
                    ]}
                />

                <main className={styles.main}>
                    <Suspense>
                        <NounCatalogue dict={dict} />
                    </Suspense>
                </main>
            </FilterDisplayProvider>
        </DictionaryProvider>
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;

    const dict = await loadDictionaries(lang, ['pages/nouns/nouns']);

    const title = dict.nouns.metadata.title;
    const description = dict.nouns.metadata.description;

    return {
        alternates: {
            canonical: `/${lang}/nouns`,
            languages: locales.reduce((acc, locale) => {
                acc[locale] = `/${locale}/nouns`;
                return acc;
            }, {} as Record<string, string>),
        },
        description,
        openGraph: {
            description,
            siteName: 'probe.wtf',
            title,
            url: `${process.env.NEXT_PUBLIC_URL}/${lang}/nouns`,
        },
        title,
        twitter: {
            description,
            title,
        },
    };
}
