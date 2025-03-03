import { NextRequest, NextResponse } from 'next/server';

let locales = ['en-US', 'zh-CN', 'zh-TW'];

export function middleware(request: NextRequest) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl;
    const pathnameHasLocale = locales.some(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Redirect if there is no locale
    request.nextUrl.pathname = `/en-US${pathname}`;

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next|api|fonts|images|favicon.ico|robots.txt|sitemap.xml).*)',
        // Optional: only run on root (/) URL
        // '/'
    ],
};
