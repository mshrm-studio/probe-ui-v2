import styles from '@/app/_styles/bg-img.module.css';
import clsx from 'clsx';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    img: string | { src: string; mdSrc?: string; xlSrc?: string };
}

export default function BgImg({
    children,
    className,
    img,
    style,
    ...props
}: Props) {
    const src = typeof img === 'string' ? img : img.src;
    const mdSrc = typeof img === 'string' ? img : img.mdSrc || img.src;
    const xlSrc = typeof img === 'string' ? img : img.xlSrc || img.src;

    const normalisedSrc = src.startsWith('http')
        ? src
        : src.startsWith('/')
        ? process.env.NEXT_PUBLIC_DO_STORAGE_URL + src
        : `${process.env.NEXT_PUBLIC_DO_STORAGE_URL}/${src}`;

    const normalisedMdSrc = mdSrc.startsWith('http')
        ? mdSrc
        : mdSrc.startsWith('/')
        ? process.env.NEXT_PUBLIC_DO_STORAGE_URL + mdSrc
        : `${process.env.NEXT_PUBLIC_DO_STORAGE_URL}/${mdSrc}`;

    const normalisedXlSrc = xlSrc.startsWith('http')
        ? xlSrc
        : xlSrc.startsWith('/')
        ? process.env.NEXT_PUBLIC_DO_STORAGE_URL + xlSrc
        : `${process.env.NEXT_PUBLIC_DO_STORAGE_URL}/${xlSrc}`;

    return (
        <div
            className={clsx(styles.bgImg, className)}
            style={
                {
                    ...style,
                    '--bg-src': `url(${normalisedSrc})`,
                    '--bg-src-md': `url(${normalisedMdSrc})`,
                    '--bg-src-xl': `url(${normalisedXlSrc})`,
                } as React.CSSProperties
            }
            {...props}
        >
            {children}
        </div>
    );
}
