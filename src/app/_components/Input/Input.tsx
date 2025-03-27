import styles from '@/app/_styles/input/input.module.css';
import clsx from 'clsx';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    invalid?: boolean;
}

export default function Input({
    className,
    invalid = false,
    ...props
}: InputProps) {
    return (
        <input
            className={clsx(styles.input, className)}
            data-invalid={invalid}
            {...props}
        />
    );
}
