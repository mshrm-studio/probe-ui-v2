import { Metadata } from 'next';
import { loadDictionaries } from '@/app/[lang]/dictionaries';
import { Locale, locales } from '@/utils/enums/Locale';
import Header from '@/app/_components/Header/Header';
import DictionaryProvider from '@/context/Dictionary';
import useApi from '@/hooks/useApi';
import Details from '@/app/[lang]/nouns/dreams/[id]/_components/Details/Details';
import Image from '@/app/[lang]/nouns/dreams/[id]/_components/Image';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/page.module.css';
import { notFound } from 'next/navigation';
import Background from '@/app/[lang]/nouns/dreams/[id]/_components/Background';
import DreamFromDB, { isDreamFromDBResponse } from '@/utils/dto/Dream/FromDB';
import RpcProvider from '@/context/Rpc';

async function fetchFallbackData(id: string): Promise<DreamFromDB | undefined> {
    const api = useApi();

    const response = await api.get(`/dream-nouns/${id}`);

    return isDreamFromDBResponse(response?.data)
        ? response.data.data
        : undefined;
}

type Props = Readonly<{
    params: Promise<{ id: string; lang: Locale }>;
}>;

export default async function Page({ params }: Props) {
    const { id, lang } = await params;

    const dict = await loadDictionaries(lang, [
        'common',
        'pages/nouns/dreams/dream/dream',
        'traits',
    ]);

    const dream = await fetchFallbackData(id);

    if (dream === undefined) notFound();

    return (
        <DictionaryProvider dictionary={dict}>
            <RpcProvider>
                <Background dream={dream}>
                    <Header
                        lang={lang}
                        islandAlign="center"
                        breadcrumbs={[
                            {
                                label: dict.dream.breadcrumbs.nouns,
                                href: '/nouns',
                            },
                            {
                                label: dict.dream.breadcrumbs.dreams,
                                href: `/nouns/dreams`,
                            },
                            {
                                label: id,
                                href: `/nouns/dreams/${id}`,
                            },
                        ]}
                    />

                    <main className={styles.main}>
                        <div className={styles.imgContainer}>
                            <Image dream={dream} />
                        </div>

                        <div className={styles.detailsContainer}>
                            <Details dream={dream} dict={dict} />
                        </div>
                    </main>
                </Background>
            </RpcProvider>
        </DictionaryProvider>
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id, lang } = await params;

    const dict = await loadDictionaries(lang, [
        'pages/nouns/dreams/dream/dream',
    ]);

    const title = dict.dream.metadata.title.replace(':id', id);
    const description = dict.dream.metadata.description.replace(':id', id);

    return {
        alternates: {
            canonical: `/${lang}/nouns/dreams/${id}`,
            languages: locales.reduce((acc, locale) => {
                acc[locale] = `/${locale}/nouns/dreams/${id}`;
                return acc;
            }, {} as Record<string, string>),
        },
        description,
        openGraph: {
            description,
            siteName: 'probe.wtf',
            title,
            type: 'website',
            url: `${process.env.NEXT_PUBLIC_URL}/${lang}/nouns/dreams/${id}`,
        },
        other: {
            'fc:frame': 'vNext',
            'fc:frame:image:aspect_ratio': '1:1',
            'fc:frame:button:1': `probe.wtf/nouns/dreams/${id}`,
            'fc:frame:button:1:action': 'link',
            'fc:frame:button:1:target': `${process.env.NEXT_PUBLIC_URL}/${lang}/nouns/dreams/${id}`,
        },
        title,
        twitter: {
            card: 'summary',
            description,
            title,
        },
    };
}
