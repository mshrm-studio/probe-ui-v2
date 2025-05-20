import clsx from 'clsx';
import styles from '@/app/_styles/textarea.module.css';

export interface Props
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    invalid?: boolean;
}

export default function Textarea({
    className,
    invalid = false,
    ...props
}: Props) {
    return (
        <textarea
            className={clsx(className, styles.textarea)}
            data-invalid={invalid}
            {...props}
        />
    );
}
