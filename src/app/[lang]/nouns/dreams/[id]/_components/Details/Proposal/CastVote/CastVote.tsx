'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import { ProposalContext } from '@/context/Proposal';
import { useContext, useState } from 'react';
import clsx from 'clsx';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/proposal/cast-vote/cast-vote.module.css';
import Button from '@/app/_components/Button';
import Form from '@/app/[lang]/nouns/dreams/[id]/_components/Details/Proposal/CastVote/Form';
import Dialog from '@/app/_components/Dialog/Dialog';

interface Props {
    className?: string;
    dict: Dictionary;
}

export default function CastVoteForm({ className, dict }: Props) {
    const [showForm, setShowForm] = useState(false);
    const { proposal } = useContext(ProposalContext);

    if (proposal?.status !== 'ACTIVE') return null;

    return (
        <div className={clsx(className, styles.container)}>
            <Button
                type="button"
                color="purple"
                onClick={() => setShowForm((prev) => !prev)}
            >
                {dict.dream.details.vote}
            </Button>

            <Dialog
                open={showForm}
                setOpen={setShowForm}
                panelClassName={styles.panel}
            >
                <Form dict={dict} setShowForm={setShowForm} />
            </Dialog>
        </div>
    );
}
