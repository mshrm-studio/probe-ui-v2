import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import AppKitProvider from '@/context/AppKit';
import { Locale, locales } from '@/utils/enums/Locale';

export async function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: Locale }>;
}>) {
    const lang = (await params).lang;

    return (
        <html lang={lang}>
            <body>
                <AppKitProvider>{children}</AppKitProvider>

                <Analytics />
            </body>
        </html>
    );
}

export const metadata: Metadata = {
    authors: [
        {
            name: 'probe.wtf',
            url: process.env.NEXT_PUBLIC_URL,
        },
    ],
    creator: 'probe.wtf',
    icons: {
        icon: `${process.env.NEXT_PUBLIC_DO_STORAGE_URL}/Probe_Logo.svg`,
    },
    openGraph: {
        locale: 'en_GB',
        siteName: 'probe.wtf',
        type: 'website',
    },
    publisher: 'probe.wtf',
    title: {
        default: 'probe.wtf',
        template: '%s | probe.wtf',
    },
    twitter: {
        card: 'summary_large_image',
        creator: '@MSHRMDAO',
        site: '@MSHRMDAO',
    },
};
