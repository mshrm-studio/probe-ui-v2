'use client';

import { useParams } from 'next/navigation';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
    number: number | string;
}

export default function LocalisedNumber({ className, number }: Props) {
    const { lang } = useParams();

    const formattedNumber = new Intl.NumberFormat(
        (lang as string).startsWith('zh') ? `${lang}-u-nu-hanidec` : lang
    ).format(Number(number));

    return <span className={className}>{formattedNumber}</span>;
}
