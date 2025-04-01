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
import TraitCanvas from '@/app/[lang]/nouns/_components/Noun/Trait/Canvas';
import Image from '@/app/_components/Image';
import useDictionary from '@/hooks/useDictionary';

interface Props<ValueType> {
    boxShadowStyle?: 'solid' | 'blurred';
    disabled?: boolean;
    label?: string;
    options: SelectOption<ValueType>[];
    required?: boolean;
    selected: ValueType | null;
    setSelected: React.Dispatch<React.SetStateAction<ValueType | null>>;
}

export default function AppComboxbox<ValueType extends string | number>({
    boxShadowStyle = 'solid',
    disabled,
    label,
    options,
    required,
    selected,
    setSelected,
}: Props<ValueType>) {
    const dict = useDictionary();

    const [query, setQuery] = useState('');

    const [selectedOption, setSelectedOption] =
        useState<SelectOption<ValueType> | null>(
            options.find((option) => option.value == selected) || null
        );

    useEffect(() => {
        setSelectedOption((prev) => {
            const newSelectedOption =
                options.find((option) => option.value == selected) || null;

            if (prev == newSelectedOption) return prev;

            return newSelectedOption;
        });
    }, [options, selected]);

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

                setSelectedOption((prev) => (prev !== option ? option : prev));

                setSelected((prev) => {
                    const newSelection = option?.value || null;

                    return newSelection !== prev ? newSelection : prev;
                });
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
                    placeholder={dict.common.none}
                    required={required}
                />

                <ComboboxButton className={styles.button}>
                    <ChevronDownIcon className={styles.buttonIcon} />
                </ComboboxButton>

                {filteredOptions.length > 0 && (
                    <ComboboxOptions className={styles.options}>
                        {filteredOptions.map((option) => (
                            <ComboboxOption
                                key={option.value}
                                value={option}
                                className={styles.option}
                            >
                                {option.imgSrc &&
                                    (option.imgSrc.startsWith('data:') ? (
                                        <img
                                            className={clsx(
                                                styles.optionImg,
                                                'h-6 w-6'
                                            )}
                                            alt={option.label}
                                            src={option.imgSrc}
                                        />
                                    ) : (
                                        <Image
                                            className={styles.optionImg}
                                            height={24}
                                            width={24}
                                            alt={option.label}
                                            src={option.imgSrc}
                                        />
                                    ))}

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
