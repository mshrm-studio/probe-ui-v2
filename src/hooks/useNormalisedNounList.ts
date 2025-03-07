'use client';

import NounFromDB, { isNounFromDB } from '@/utils/dto/Noun/FromDB';
import NounFromSubgraph from '@/utils/dto/Noun/FromSubgraph';
import { useMemo } from 'react';

const useNormalisedNounList = (nouns: NounFromDB[] | NounFromSubgraph[]) => {
    const normalisedNounList = useMemo(
        () =>
            nouns.map((noun) =>
                isNounFromDB(noun)
                    ? {
                          id: noun.token_id,
                          seed: {
                              accessory: noun.accessory_index,
                              background: noun.background_index,
                              body: noun.body_index,
                              glasses: noun.glasses_index,
                              head: noun.head_index,
                          },
                      }
                    : {
                          id: Number(noun.id),
                          seed: noun.seed,
                      }
            ),
        [nouns]
    );

    return normalisedNounList;
};

export default useNormalisedNounList;
