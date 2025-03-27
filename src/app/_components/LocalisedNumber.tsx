'use client';

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
        const n = new Intl.NumberFormat(
            (lang as string).startsWith('zh') ? `${lang}-u-nu-hanidec` : lang
        ).format(Number(number));

        if (removeCommasAndPeriods) {
            return n.replace(/[.,]/g, '');
        }

        return n;
    }, [lang]);

    return <span className={className}>{formattedNumber}</span>;
}
