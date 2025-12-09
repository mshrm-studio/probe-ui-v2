import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import AppKitProvider from '@/context/AppKit';
import Script from 'next/script';

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body>
                <Script
                    src="https://assets.noundry.wtf/nouns/image-data.js"
                    strategy="beforeInteractive"
                />

                <Script
                    src="https://assets.noundry.wtf/lil-nouns/image-data.js"
                    strategy="beforeInteractive"
                />

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
