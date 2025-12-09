import { isLocale } from '@/utils/enums/Locale';
import { redirect } from 'next/navigation';
import { locales } from '@/utils/enums/Locale';

export async function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}

export default async function Layout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}>) {
    const { lang } = await params;

    if (!isLocale(lang)) {
        redirect('/en-US');
    }

    return <div>{children}</div>;
}
