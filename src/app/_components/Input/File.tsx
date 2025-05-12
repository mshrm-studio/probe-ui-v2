import styles from '@/app/_styles/input/file.module.css';
import clsx from 'clsx';

export interface InputFileProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    invalid?: boolean;
    label: string;
    sizeStyle?: 'base' | 'lg';
}

export default function InputFile({
    className,
    accept,
    invalid = false,
    label,
    sizeStyle = 'base',
    ...props
}: InputFileProps) {
    return (
        <label
            htmlFor={label}
            className={clsx(styles.container, styles[sizeStyle], className)}
        >
            <span>{label}</span>

            <input
                id={label}
                name={label}
                accept={accept || 'image/png'}
                type="file"
                className="sr-only"
                {...props}
            />
        </label>
    );
}
