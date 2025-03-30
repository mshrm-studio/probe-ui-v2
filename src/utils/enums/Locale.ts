export enum Locale {
    EnglishUnitedStates = 'en-US',
    ChineseSimplified = 'zh-CN',
    ChineseTraditional = 'zh-TW',
    Japanese = 'ja-JP',
}

export const locales = Object.values(Locale);

export function isLocale(value: unknown): value is Locale {
    return typeof value === 'string' && (locales as string[]).includes(value);
}
