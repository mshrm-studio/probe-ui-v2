import { Metadata } from 'next';
import { loadDictionaries } from '@/app/[lang]/dictionaries';
import { Locale, locales } from '@/utils/enums/Locale';
import NounCatalogue from '@/app/[lang]/nouns/_components/Catalogue/Catalogue';
import FilterDisplayProvider from '@/context/FilterDisplay';
import Header from '@/app/_components/Header/Header';
import DictionaryProvider from '@/context/Dictionary';
import { Suspense } from 'react';

type Props = Readonly<{
    params: Promise<{ lang: Locale }>;
}>;

export default async function Page({ params }: Props) {
    const lang = (await params).lang;

    const dict = await loadDictionaries(lang, [
        'common',
        'pages/nouns',
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
                            href: `/${lang}/nouns`,
                        },
                    ]}
                />

                <main>
                    <Suspense>
                        <NounCatalogue />
                    </Suspense>
                </main>
            </FilterDisplayProvider>
        </DictionaryProvider>
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const lang = (await params).lang;

    const dict = await loadDictionaries(lang, ['pages/nouns']);

    return {
        alternates: {
            canonical: `/${lang}/nouns`,
            languages: locales.reduce((acc, locale) => {
                acc[locale] = `/${locale}`;
                return acc;
            }, {} as Record<string, string>),
        },
        description: dict.nouns.metadata.description,
        openGraph: {
            description: dict.nouns.metadata.description,
            title: dict.nouns.metadata.title,
            url: `${process.env.NEXT_PUBLIC_URL}/${lang}/nouns`,
        },
        title: dict.nouns.metadata.title,
        twitter: {
            description: dict.nouns.metadata.description,
            title: dict.nouns.metadata.title,
        },
    };
}
