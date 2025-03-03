import { Locale } from '@/utils/enums/Locale';
import { Metadata } from 'next';

export default async function Page({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    // const lang = (await params).lang;

    return <div></div>;
}

const title = 'Probe';
const description = 'Probing Nouns & Lil Nouns.';

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        description,
        images: ['todo'],
        title,
        url: process.env.NEXT_PUBLIC_URL,
    },
    twitter: {
        description,
        images: ['todo'],
        title,
    },
};
