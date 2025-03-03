'use client';

import SelectOption from '@/utils/dto/SelectOption';
import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
    Label,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useEffect, useMemo, useState } from 'react';
import styles from '@/app/_styles/combobox/combobox.module.css';
import clsx from 'clsx';
import TraitCanvas from '@/app/_components/Trait/Canvas';

interface Props<ValueType> {
    anchorTo?: 'bottom' | 'right';
    boxShadowStyle?: 'solid' | 'blurred';
    disabled?: boolean;
    label?: string;
    options: SelectOption<ValueType>[];
    required?: boolean;
    selected: ValueType | null;
    setSelected: React.Dispatch<React.SetStateAction<ValueType | null>>;
}

export default function AppComboxbox<ValueType extends string | number>({
    anchorTo = 'bottom',
    boxShadowStyle = 'solid',
    disabled,
    label,
    options,
    required,
    selected,
    setSelected,
}: Props<ValueType>) {
    const [query, setQuery] = useState('');

    const [selectedOption, setSelectedOption] =
        useState<SelectOption<ValueType> | null>(
            options.find((option) => option.value == selected) || null
        );

    useEffect(() => {
        setSelectedOption(
            options.find((option) => option.value == selected) || null
        );
    }, [selected]);

    const filteredOptions = useMemo(() => {
        if (query === '') return options;

        const optionsStartingWithQuery = options.filter((option) =>
            option.label.toLowerCase().startsWith(query.toLowerCase())
        );

        const optionsIncludingQuery = options.filter(
            (option) =>
                option.label.toLowerCase().includes(query.toLowerCase()) &&
                !optionsStartingWithQuery.includes(option)
        );

        return [...optionsStartingWithQuery, ...optionsIncludingQuery];
    }, [options, query]);

    return (
        <Combobox
            as="div"
            className={clsx(
                styles.wrapper,
                boxShadowStyle === 'blurred'
                    ? styles.blurredBoxShadow
                    : styles.solidBoxShadow
            )}
            immediate
            value={selectedOption}
            onChange={(option) => {
                setQuery('');
                setSelectedOption(option);
                setSelected(option?.value || null);
            }}
        >
            <div className="relative">
                {label && <Label className={styles.label}>{label}</Label>}

                <ComboboxInput
                    className={styles.input}
                    disabled={disabled}
                    displayValue={(option) =>
                        typeof option === 'object' &&
                        option &&
                        'label' in option &&
                        typeof option.label === 'string'
                            ? option.label
                            : ''
                    }
                    onBlur={() => setQuery('')}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="None"
                    required={required}
                />

                <ComboboxButton className={styles.button}>
                    <ChevronDownIcon
                        className={styles.buttonIcon}
                        data-options-anchored-to={anchorTo}
                    />
                </ComboboxButton>

                {filteredOptions.length > 0 && (
                    <ComboboxOptions
                        className={styles.options}
                        anchor={{ to: anchorTo, gap: '8px' }}
                    >
                        {filteredOptions.map((option) => (
                            <ComboboxOption
                                key={option.value}
                                value={option}
                                className={styles.option}
                            >
                                {option.imgSrc && (
                                    <img
                                        className={styles.optionImg}
                                        src={option.imgSrc}
                                        alt={option.label}
                                    />
                                )}

                                {option.encodedImage && (
                                    <TraitCanvas
                                        className={styles.optionCanvas}
                                        rleData={option.encodedImage.data}
                                    />
                                )}

                                <span className="truncate">{option.label}</span>
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                )}
            </div>
        </Combobox>
    );
}
