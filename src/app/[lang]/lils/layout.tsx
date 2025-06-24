import { Locale } from '@/utils/enums/Locale';
import Head from 'next/head';

export default async function Layout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: Locale }>;
}>) {
    // const { lang } = await params;

    return (
        <>
            <Head>
                <script src="https://assets.noundry.wtf/lil-nouns/image-data.js" />
            </Head>

            <div>{children}</div>
        </>
    );
}
