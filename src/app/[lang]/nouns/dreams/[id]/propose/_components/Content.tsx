'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import styles from '@/app/[lang]/nouns/dreams/[id]/propose/_styles/content.module.css';
import { useMemo, useState } from 'react';
import Input from '@/app/_components/Input/Input';
import Textarea from '@/app/_components/Textarea';
import FormField from '@/app/_components/FormField';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
    dict: Dictionary;
}

type Section = 'TitleAndDescription' | 'RequestedCompensation';

export default function Content({ dict }: Props) {
    const [section, setSection] = useState<Section>('TitleAndDescription');
    const [description, setDescription] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const markdownPreview = useMemo(() => {
        if (!title.trim()) return description;

        return `# ${title.trim()}\n\n${description}`;
    }, [title, description]);

    return (
        <div className={styles.container}>
            <div>
                <div>{dict.propose.back}</div>

                <div>{dict.propose.titleAndDescription.title}</div>
            </div>

            <FormField
                label={dict.propose.titleAndDescription.field.title.label}
            >
                <Input
                    motif="borderless"
                    placeholder={
                        dict.propose.titleAndDescription.field.title.placeholder
                    }
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </FormField>

            <FormField
                label={dict.propose.titleAndDescription.field.description.label}
            >
                <Textarea
                    placeholder={
                        dict.propose.titleAndDescription.field.description
                            .placeholder
                    }
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </FormField>

            <div className="bg-white w-full font-normal normal-case prose">
                <Markdown remarkPlugins={[remarkGfm]}>
                    {markdownPreview}
                </Markdown>
            </div>
        </div>
    );
}
