'use client';

import { createContext, Dispatch, SetStateAction, useState } from 'react';

export const FilterDisplayContext = createContext<{
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}>({
    show: false,
    setShow: () => false,
});

interface Props {
    children: React.ReactNode;
}

export default function FilterDisplayProvider({ children }: Readonly<Props>) {
    const [show, setShow] = useState(false);

    return (
        <FilterDisplayContext.Provider value={{ show, setShow }}>
            {children}
        </FilterDisplayContext.Provider>
    );
}
