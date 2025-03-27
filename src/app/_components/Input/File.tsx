import styles from '@/app/_styles/input/file.module.css';
import clsx from 'clsx';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    invalid?: boolean;
    label: string;
}

export default function Input({
    className,
    accept,
    invalid = false,
    label,
    ...props
}: InputProps) {
    return (
        <label htmlFor={label} className={clsx(styles.container, className)}>
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
