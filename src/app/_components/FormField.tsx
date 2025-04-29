import styles from '@/app/_styles/form-field.module.css';
import clsx from 'clsx';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    invalid?: boolean;
    label?: string;
    required?: boolean;
}

export default function FormField({
    children,
    className,
    label,
    required,
}: Props) {
    return (
        <div className={clsx(styles.formField, className)}>
            {label && (
                <label className={styles.label}>
                    {label}
                    {required && <span>*</span>}
                </label>
            )}

            <div className={styles.field}>{children}</div>
        </div>
    );
}
