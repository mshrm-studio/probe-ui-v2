import { isLocale } from '@/utils/enums/Locale';
import { redirect } from 'next/navigation';

export default async function Layout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}>) {
    const { lang } = await params;

    if (!isLocale(lang)) {
        redirect('/en-US/nouns');
    }

    return <div>{children}</div>;
}
