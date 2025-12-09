import { NextRequest, NextResponse } from 'next/server';
import { locales } from '@/utils/enums/Locale';
import { match } from '@formatjs/intl-localematcher';

function getLocale(request: NextRequest) {
    const localeCookie = request.cookies.get('NEXT_LOCALE')?.value || 'en-US';

    return match([localeCookie], locales, 'en-US');
}

export function proxy(request: NextRequest) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl;

    const pathnameHasLocale = locales.some(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    const locale = getLocale(request);

    request.nextUrl.pathname = `/${locale}${pathname}`;

    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next|api|fonts|images|favicon.ico|robots.txt|sitemap.xml|.well-known).*)',
        // Optional: only run on root (/) URL
        // '/'
    ],
};
