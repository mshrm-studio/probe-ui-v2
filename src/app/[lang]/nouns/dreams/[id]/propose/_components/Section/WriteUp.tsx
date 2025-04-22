import Input from '@/app/_components/Input/Input';
import Textarea from '@/app/_components/Textarea';
import FormField from '@/app/_components/FormField';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Dictionary } from '@/app/[lang]/dictionaries';
import React, { useEffect, useState } from 'react';
import styles from '@/app/[lang]/nouns/dreams/[id]/propose/_styles/section/write-up.module.css';
import clsx from 'clsx';
import DreamFromDB from '@/utils/dto/Dream/FromDB';
import Button from '@/app/_components/Button';
import { DreamFromDBWithCustomTrait } from '@/utils/dto/Dream/FromDB';

interface Props {
    dict: Dictionary;
    dream: DreamFromDBWithCustomTrait;
    traitCanvas: HTMLCanvasElement;
    writeUp: string;
    setWriteUp: React.Dispatch<React.SetStateAction<string>>;
    goToNextSection: () => void;
}

export default function WriteUp({
    dict,
    dream,
    traitCanvas,
    writeUp,
    setWriteUp,
    goToNextSection,
}: Props) {
    const [description, setDescription] = useState<string>('');

    const [title, setTitle] = useState<string>(
        dream.custom_trait_image
            .split('/')
            .pop()!
            .replace(/\.[^.]+$/, '')
    );

    useEffect(() => {
        const imagePreview = `![Trait Image](${traitCanvas.toDataURL(
            'image/png'
        )})`;
        const proposalClient = `### Proposal submitted via [probe.wtf](https://www.probe.wtf)`;

        const footer = `${imagePreview}\n\n${proposalClient}`;

        if (!title.trim()) setWriteUp(`${description}\n\n${footer}`);

        setWriteUp(`# ${title.trim()}\n\n${description}\n\n${footer}`);
    }, [description, title, traitCanvas]);

    return (
        <div className={styles.container}>
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

            {writeUp && (
                <div className={styles.markdownPreviewContainer}>
                    <div className={styles.markdownPreviewTitle}>
                        {dict.propose.titleAndDescription.propsalPreviewTitle}
                    </div>

                    <div className={clsx(styles.markdownPreview, 'prose')}>
                        <Markdown
                            remarkPlugins={[remarkGfm]}
                            urlTransform={(url, key) => {
                                if (key === 'src' && url.startsWith('data:'))
                                    return url;
                                return url;
                            }}
                        >
                            {writeUp}
                        </Markdown>
                    </div>
                </div>
            )}

            <div className={styles.actions}>
                <Button
                    color="purple"
                    className={styles.actionBtn}
                    onClick={goToNextSection}
                >
                    {dict.propose.titleAndDescription.next}
                </Button>
            </div>
        </div>
    );
}
