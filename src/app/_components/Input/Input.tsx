import styles from '@/app/_styles/input/input.module.css';
import clsx from 'clsx';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    invalid?: boolean;
    motif?: 'bordered' | 'borderless';
}

export default function Input({
    className,
    invalid = false,
    motif = 'bordered',
    ...props
}: Props) {
    return (
        <input
            className={clsx(
                styles.input,
                motif === 'bordered' ? styles.bordered : styles.borderless,
                className
            )}
            data-invalid={invalid}
            {...props}
        />
    );
}
