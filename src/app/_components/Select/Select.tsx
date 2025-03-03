import SelectOption from '@/utils/dto/SelectOption';

export interface SelectProps<ValueType extends string | number>
    extends React.InputHTMLAttributes<HTMLSelectElement> {
    className?: string;
    invalid?: boolean;
    options: SelectOption<ValueType>[];
}

export default function Select<ValueType extends string | number>({
    className,
    invalid = false,
    options,
    ...props
}: SelectProps<ValueType>) {
    return (
        <select className={className} data-invalid={invalid} {...props}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
