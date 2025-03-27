import Image from 'next/image';
import styles from '@/app/_styles/image.module.css';
import clsx from 'clsx';

interface BaseProps {
    className?: string;
    src: string;
    alt: string;
    priority?: boolean;
    unoptimized?: boolean;
}

interface PropsWithSize {
    height: number;
    width: number;
}

interface PropsWithoutSize {
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    sizes: string;
}

type Props = BaseProps & (PropsWithSize | PropsWithoutSize);

export default function AppImage(props: Props) {
    const { className, src, alt, priority, unoptimized } = props;

    const normalisedSrc = src.startsWith('http')
        ? src
        : src.startsWith('/')
        ? process.env.NEXT_PUBLIC_DO_STORAGE_URL + src
        : `${process.env.NEXT_PUBLIC_DO_STORAGE_URL}/${src}`;

    if ('height' in props && 'width' in props) {
        return (
            <Image
                className={className}
                src={normalisedSrc}
                alt={alt}
                height={props.height}
                width={props.width}
                priority={priority}
            />
        );
    }

    return (
        <div className={clsx(styles.container, className)}>
            <Image
                src={normalisedSrc}
                alt={alt}
                fill
                sizes={props.sizes}
                style={{
                    objectFit: props.objectFit || 'cover',
                }}
                priority={priority}
                unoptimized={unoptimized}
            />
        </div>
    );
}
