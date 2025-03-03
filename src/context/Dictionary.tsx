'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import { createContext } from 'react';

export const DictionaryContext = createContext<Dictionary | undefined>(
    undefined
);

interface Props {
    children: React.ReactNode;
    dictionary: Dictionary;
}

export default function DictionaryProvider({
    children,
    dictionary,
}: Readonly<Props>) {
    return (
        <DictionaryContext.Provider value={dictionary}>
            {children}
        </DictionaryContext.Provider>
    );
}
