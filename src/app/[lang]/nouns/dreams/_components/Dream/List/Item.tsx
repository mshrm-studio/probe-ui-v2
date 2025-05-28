'use client';

import styles from '@/app/[lang]/nouns/dreams/_styles/dream/list/item.module.css';
import Link from 'next/link';
import DreamFromDB from '@/utils/dto/Dream/FromDB';
import LocalisedNumber from '@/app/_components/LocalisedNumber';
import { DreamImageFromSeed } from '@/app/[lang]/nouns/dreams/_components/Dream/Image/FromSeed';
import { NounTraitLayer } from '@/utils/enums/Noun/TraitLayer';
import { Dictionary } from '@/app/[lang]/dictionaries';
import { NounProposalFromSubgraphWithCandidateSlug } from '@/context/Proposals';
import { useMemo } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    activeProposals?: NounProposalFromSubgraphWithCandidateSlug[];
    dict: Dictionary;
    dream: DreamFromDB;
}

export default function DreamListItem({ activeProposals, dict, dream }: Props) {
    const isActiveProposal = useMemo(() => {
        return activeProposals
            ?.filter((ap) => !ap.latestBlockAfterProposalEndBlock)
            .map((ap) => ap.candidateSlug)
            .includes(`probe-dream-${dream.id}`);
    }, [activeProposals, dream]);

    return (
        <Link href={`/nouns/dreams/${dream.id}`}>
            <div
                className={styles.container}
                aria-live={isActiveProposal ? 'assertive' : 'off'}
                style={{ animationDelay: `${(Math.random() * 2).toFixed(2)}s` }}
            >
                <DreamImageFromSeed
                    seed={{
                        accessory:
                            dream.custom_trait_layer ===
                            NounTraitLayer.Accessory
                                ? dream.custom_trait_image_url
                                : dream.accessory_seed_id,

                        background: dream.background_seed_id,

                        body:
                            dream.custom_trait_layer === NounTraitLayer.Body
                                ? dream.custom_trait_image_url
                                : dream.body_seed_id,

                        glasses:
                            dream.custom_trait_layer === NounTraitLayer.Glasses
                                ? dream.custom_trait_image_url
                                : dream.glasses_seed_id,

                        head:
                            dream.custom_trait_layer === NounTraitLayer.Head
                                ? dream.custom_trait_image_url
                                : dream.head_seed_id,
                    }}
                />

                <label className={styles.label}>
                    <LocalisedNumber number={dream.id} removeCommasAndPeriods />
                </label>

                {isActiveProposal && (
                    <div className={styles.voteBadge}>
                        {dict.dreams.catalogue.list.item.vote}
                    </div>
                )}
            </div>
        </Link>
    );
}
