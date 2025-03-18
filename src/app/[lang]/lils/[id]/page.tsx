import { Metadata } from 'next';
import { loadDictionaries } from '@/app/[lang]/dictionaries';
import { Locale, locales } from '@/utils/enums/Locale';
import Header from '@/app/_components/Header/Header';
import DictionaryProvider from '@/context/Dictionary';
import LilFromDB, { isLilFromDBResponse } from '@/utils/dto/Lil/FromDB';
import useApi from '@/hooks/useApi';
import Details from '@/app/[lang]/lils/[id]/_components/Details/Details';
import Image from '@/app/[lang]/lils/[id]/_components/Image';
import styles from '@/app/[lang]/lils/[id]/_styles/page.module.css';
import useSubgraphClient from '@/hooks/useSubgraphClient';
import { FETCH_AUCTION } from '@/utils/lib/nouns/subgraph/auction';
import { notFound } from 'next/navigation';
import AuctionFromSubgraph, {
    isAuctionFromSubgraph,
} from '@/utils/dto/Noun/Auction/FromSubgraph';
import Background from '@/app/[lang]/lils/[id]/_components/Background';

async function fetchFallbackData(id: string): Promise<{
    auction: AuctionFromSubgraph | undefined;
    lil: LilFromDB | undefined;
}> {
    let response: any;
    let result: any;

    const api = useApi();
    const client = useSubgraphClient();

    try {
        response = await api.get(`/lils/${id}`);
    } catch (error) {
        response = null;
    }

    try {
        result = await client.query(FETCH_AUCTION, { id }).toPromise();
    } catch (error) {
        result = null;
    }

    return {
        auction: isAuctionFromSubgraph(result?.data?.auction)
            ? result.data.auction
            : undefined,
        lil: isLilFromDBResponse(response?.data)
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
        'pages/lils/lil',
        'traits',
    ]);

    const { auction, lil } = await fetchFallbackData(id);

    if (auction === undefined && lil === undefined) notFound();

    return (
        <DictionaryProvider dictionary={dict}>
            <Background auction={auction} lil={lil}>
                <Header lang={lang} islandAlign="left" />

                <main className={styles.main}>
                    <div className={styles.imgContainer}>
                        <Image auction={auction} lil={lil} />
                    </div>

                    <div className={styles.detailsContainer}>
                        <Details auction={auction} lil={lil} dict={dict} />
                    </div>
                </main>
            </Background>
        </DictionaryProvider>
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id, lang } = await params;

    const dict = await loadDictionaries(lang, ['pages/lils/lil']);

    const images = [
        {
            url: `${process.env.NEXT_PUBLIC_DO_STORAGE_URL}/lils/pngs/${id}.png`,
            width: 320,
            height: 320,
        },
    ];

    const title = dict.lil.metadata.title.replace(':id', id);
    const description = dict.lil.metadata.description.replace(':id', id);

    return {
        alternates: {
            canonical: `/${lang}/lils/${id}`,
            languages: locales.reduce((acc, locale) => {
                acc[locale] = `/${locale}/lils/${id}`;
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
            url: `${process.env.NEXT_PUBLIC_URL}/${lang}/lils/${id}`,
        },
        other: {
            'fc:frame': 'vNext',
            'fc:frame:image': images[0].url,
            'fc:frame:image:aspect_ratio': '1:1',
            'fc:frame:button:1': `probe.wtf/lils/${id}`,
            'fc:frame:button:1:action': 'link',
            'fc:frame:button:1:target': `${process.env.NEXT_PUBLIC_URL}/${lang}/lils/${id}`,
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
