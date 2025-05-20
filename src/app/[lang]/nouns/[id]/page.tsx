import { Metadata } from 'next';
import { loadDictionaries } from '@/app/[lang]/dictionaries';
import { Locale, locales } from '@/utils/enums/Locale';
import Header from '@/app/_components/Header/Header';
import DictionaryProvider from '@/context/Dictionary';
import NounFromDB, { isNounFromDBResponse } from '@/utils/dto/Noun/FromDB';
import useApi from '@/hooks/useApi';
import Details from '@/app/[lang]/nouns/[id]/_components/Details/Details';
import Image from '@/app/[lang]/nouns/[id]/_components/Image';
import styles from '@/app/[lang]/nouns/[id]/_styles/page.module.css';
import { FETCH_AUCTION } from '@/utils/lib/nouns/subgraph/auction';
import { notFound } from 'next/navigation';
import AuctionFromSubgraph, {
    isAuctionFromSubgraph,
} from '@/utils/dto/Noun/Auction/FromSubgraph';
import Background from '@/app/[lang]/nouns/[id]/_components/Background';
import { urqlClient } from '@/utils/lib/urqlClient';

async function fetchFallbackData(id: string): Promise<{
    auction: AuctionFromSubgraph | undefined;
    noun: NounFromDB | undefined;
}> {
    let response: any;
    let result: any;

    const api = useApi();

    try {
        response = await api.get(`/nouns/${id}`);
    } catch (error) {
        response = null;
    }

    try {
        result = await urqlClient.query(FETCH_AUCTION, { id }).toPromise();
    } catch (error) {
        result = null;
    }

    return {
        auction: isAuctionFromSubgraph(result?.data?.auction)
            ? result.data.auction
            : undefined,
        noun: isNounFromDBResponse(response?.data)
            ? response.data.data
            : undefined,
    };
}

type Props = Readonly<{
    params: Promise<{ id: string; lang: Locale }>;
}>;

export default async function Page({ params }: Props) {
    const { id, lang } = await params;

    const dict = await loadDictionaries(lang, [
        'common',
        'pages/nouns/noun',
        'traits',
    ]);

    const { auction, noun } = await fetchFallbackData(id);

    if (auction === undefined && noun === undefined) notFound();

    return (
        <DictionaryProvider dictionary={dict}>
            <Background auction={auction} noun={noun}>
                <Header
                    lang={lang}
                    islandAlign="center"
                    breadcrumbs={[
                        {
                            label: dict.noun.breadcrumbs.nouns,
                            href: '/nouns',
                        },
                        {
                            label: id,
                            href: `/nouns/${id}`,
                        },
                    ]}
                />

                <main className={styles.main}>
                    <div className={styles.imgContainer}>
                        <Image auction={auction} noun={noun} />
                    </div>

                    <div className={styles.detailsContainer}>
                        <Details auction={auction} noun={noun} dict={dict} />
                    </div>
                </main>
            </Background>
        </DictionaryProvider>
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id, lang } = await params;

    const dict = await loadDictionaries(lang, ['pages/nouns/noun']);

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
