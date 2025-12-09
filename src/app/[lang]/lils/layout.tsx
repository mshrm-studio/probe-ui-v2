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
        redirect('/en-US/lils');
    }

    return <div>{children}</div>;
}
