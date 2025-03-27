'use client';

import { useParams } from 'next/navigation';
import { DateTime } from 'luxon';
import { useMemo } from 'react';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
    dateTime: string;
}

export default function LocalisedDateTime({ className, dateTime }: Props) {
    const { lang } = useParams();

    const formattedDateTime = useMemo(() => {
        return DateTime.fromISO(dateTime)
            .setLocale(typeof lang === 'string' ? lang : 'en-US')
            .toLocaleString(DateTime.DATETIME_MED);
    }, [dateTime, lang]);

    return <span className={className}>{formattedDateTime}</span>;
}
