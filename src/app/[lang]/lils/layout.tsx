import { Locale } from '@/utils/enums/Locale';

export default async function Layout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: Locale }>;
}>) {
    // const { lang } = await params;

    return <div>{children}</div>;
}
