import { Metadata } from 'next';
import { loadDictionaries } from '@/app/[lang]/dictionaries';
import { Locale, locales } from '@/utils/enums/Locale';
import Header from '@/app/_components/Header/Header';
import DictionaryProvider from '@/context/Dictionary';
import { isNounFromDBResponse } from '@/utils/dto/Noun/FromDB';
import useApi from '@/hooks/useApi';
import Details from '@/app/[lang]/nouns/[id]/_components/Details/Details';
import Image from '@/app/[lang]/nouns/[id]/_components/Image';
import styles from '@/app/[lang]/nouns/[id]/_styles/page.module.css';

async function fetchFallbackData(id: string) {
    const api = useApi();

    const { data } = await api.get(`/nouns/${id}`);

    if (!isNounFromDBResponse(data)) throw new Error('Invalid data');

    return data;
}

type Props = Readonly<{
    params: Promise<{ id: string; lang: Locale }>;
}>;

export default async function Page({ params }: Props) {
    const { id, lang } = await params;

    const dict = await loadDictionaries(lang, [
        'common',
        'pages/noun',
        'traits',
    ]);

    const { data } = await fetchFallbackData(id);

    return (
        <DictionaryProvider dictionary={dict}>
            <div
                style={{
                    backgroundColor:
                        data.background_index === 0 ? '#d5d7e1' : '#e1d7d5',
                }}
            >
                <Header lang={lang} islandAlign="left" />

                <main className={styles.main}>
                    <Image noun={data} className={styles.imgContainer} />

                    <Details
                        noun={data}
                        className={styles.detailsContainer}
                        dict={dict}
                    />
                </main>
            </div>
        </DictionaryProvider>
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id, lang } = await params;

    const dict = await loadDictionaries(lang, ['pages/noun']);

    const images = [
        {
            url: `${process.env.NEXT_PUBLIC_DO_STORAGE_URL}/nouns/pngs/${id}.png`,
            width: 320,
            height: 320,
        },
    ];

    const title = dict.noun.metadata.title.replace(':id', id);
    const description = dict.noun.metadata.description.replace(':id', id);

    return {
        alternates: {
            canonical: `/${lang}/nouns/${id}`,
            languages: locales.reduce((acc, locale) => {
                acc[locale] = `/${locale}/nouns/${id}`;
                return acc;
            }, {} as Record<string, string>),
        },
        description,
        openGraph: {
            description,
            images,
            siteName: 'probe.wtf',
            title,
            type: 'website',
            url: `${process.env.NEXT_PUBLIC_URL}/${lang}/nouns/${id}`,
        },
        other: {
            'fc:frame': 'vNext',
            'fc:frame:image': images[0].url,
            'fc:frame:image:aspect_ratio': '1:1',
            'fc:frame:button:1': `probe.wtf/nouns/${id}`,
            'fc:frame:button:1:action': 'link',
            'fc:frame:button:1:target': `${process.env.NEXT_PUBLIC_URL}/${lang}/nouns/${id}`,
        },
        title,
        twitter: {
            card: 'summary',
            description,
            images,
            title,
        },
    };
}
