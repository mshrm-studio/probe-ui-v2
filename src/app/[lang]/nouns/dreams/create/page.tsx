import { Metadata } from 'next';
import { loadDictionaries } from '@/app/[lang]/dictionaries';
import { Locale, locales } from '@/utils/enums/Locale';
import DictionaryProvider from '@/context/Dictionary';
import Content from '@/app/[lang]/nouns/dreams/create/_components/Content';
import Header from '@/app/_components/Header/Header';

type Props = Readonly<{
    params: Promise<{ lang: Locale }>;
}>;

export default async function Page({ params }: Props) {
    const { lang } = await params;

    const dict = await loadDictionaries(lang, [
        'common',
        'pages/nouns/dreams/create',
        'traits',
    ]);

    return (
        <DictionaryProvider dictionary={dict}>
            <Content dict={dict}>
                <Header lang={lang} islandAlign="left" />
            </Content>
        </DictionaryProvider>
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;

    const dict = await loadDictionaries(lang, ['pages/nouns/dreams/create']);

    const title = dict.create.metadata.title;
    const description = dict.create.metadata.description;

    return {
        alternates: {
            canonical: `/${lang}/nouns/dreams/create`,
            languages: locales.reduce((acc, locale) => {
                acc[locale] = `/${locale}/nouns/dreams/create`;
                return acc;
            }, {} as Record<string, string>),
        },
        description,
        openGraph: {
            description,
            siteName: 'probe.wtf',
            title,
            url: `${process.env.NEXT_PUBLIC_URL}/${lang}/nouns/dreams/create`,
        },
        title,
        twitter: {
            description,
            title,
        },
    };
}
