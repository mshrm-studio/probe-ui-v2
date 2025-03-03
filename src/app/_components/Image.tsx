import Image from 'next/image';
import styles from '@/app/_styles/image.module.css';
import clsx from 'clsx';

interface BaseProps {
    src: string;
    alt: string;
}

interface PropsWithSize {
    height: number;
    width: number;
}

interface PropsWithoutSize {
    className?: string;
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    sizes: string;
}

type Props = BaseProps & (PropsWithSize | PropsWithoutSize);

export default function AppImage(props: Props) {
    const { src, alt } = props;

    const normalisedSrc = src.startsWith('http')
        ? src
        : src.startsWith('/')
        ? process.env.NEXT_PUBLIC_DO_STORAGE_URL + src
        : `${process.env.NEXT_PUBLIC_DO_STORAGE_URL}/${src}`;

    if ('height' in props && 'width' in props) {
        return (
            <Image
                src={normalisedSrc}
                alt={alt}
                height={props.height}
                width={props.width}
            />
        );
    }

    return (
        <div className={clsx(styles.container, props.className)}>
            <Image
                src={normalisedSrc}
                alt={alt}
                fill
                sizes={props.sizes}
                style={{
                    objectFit: props.objectFit || 'cover',
                }}
            />
        </div>
    );
}
