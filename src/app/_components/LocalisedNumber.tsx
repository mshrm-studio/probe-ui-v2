'use client';

import { isLocale } from '@/utils/enums/Locale';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
    number: number | string;
    removeCommasAndPeriods?: boolean;
}

export default function LocalisedNumber({
    className,
    number,
    removeCommasAndPeriods,
}: Props) {
    const { lang } = useParams();

    const formattedNumber = useMemo(() => {
        if (isLocale(lang) === false) return number;

        const n = new Intl.NumberFormat(lang).format(Number(number));

        if (removeCommasAndPeriods) {
            return n.replace(/[.,]/g, '');
        }

        return number;
    }, [number, lang, removeCommasAndPeriods]);

    return <span className={className}>{formattedNumber}</span>;
}
