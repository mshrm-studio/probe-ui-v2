import 'server-only';

import { Locale } from '@/utils/enums/Locale';

export interface Dictionary {
    [key: string]: any;
}

export const loadDictionary = (
    l: Locale,
    filePath: string
): Promise<Dictionary> =>
    import(`../../utils/dictionaries/${l}/${filePath}.json`).then(
        (module) => module.default
    );

export const loadDictionaries = async (l: Locale, filePathList: string[]) => {
    const dictionaries = await Promise.all(
        filePathList.map(async (filePath) => {
            const dict = await loadDictionary(l, filePath);

            const parts = filePath.split('/');

            const namespace = parts[parts.length - 1];

            return { [namespace]: dict };
        })
    );

    return Object.assign({}, ...dictionaries);
};
