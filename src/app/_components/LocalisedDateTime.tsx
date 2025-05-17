'use client';

import { useParams } from 'next/navigation';
import { DateTime } from 'luxon';
import { useMemo } from 'react';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
    dateTime: string | number;
    format?: Intl.DateTimeFormatOptions;
}

export default function LocalisedDateTime({
    className,
    dateTime,
    format = DateTime.DATETIME_MED,
}: Props) {
    const { lang } = useParams();

    const formattedDateTime = useMemo(() => {
        const dt =
            typeof dateTime === 'number' || /^\d+$/.test(dateTime)
                ? DateTime.fromSeconds(Number(dateTime)) // EG 1713753900 or "1713753900"
                : DateTime.fromISO(String(dateTime)); // EG 2025-04-22T03:45:00Z

        return dt
            .setLocale(typeof lang === 'string' ? lang : 'en-US')
            .toLocaleString(format);
    }, [dateTime, lang]);

    return <span className={className}>{formattedDateTime}</span>;
}
