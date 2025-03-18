'use client';

import LilFromDB, { isLilFromDB } from '@/utils/dto/Lil/FromDB';
import LilFromSubgraph from '@/utils/dto/Lil/FromSubgraph';
import { useMemo } from 'react';

const useNormalisedLilList = (lils: LilFromDB[] | LilFromSubgraph[]) => {
    const normalisedLilList = useMemo(
        () =>
            lils.map((lil) =>
                isLilFromDB(lil)
                    ? {
                          id: lil.token_id,
                          seed: {
                              accessory: lil.accessory_index,
                              background: lil.background_index,
                              body: lil.body_index,
                              glasses: lil.glasses_index,
                              head: lil.head_index,
                          },
                      }
                    : {
                          id: Number(lil.id),
                          seed: lil.seed,
                      }
            ),
        [lils]
    );

    return normalisedLilList;
};

export default useNormalisedLilList;
