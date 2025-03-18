'use client';

import LilFromDB, { isLilFromDB } from '@/utils/dto/Lil/FromDB';
import LilFromSubgraph from '@/utils/dto/Lil/FromSubgraph';
import { useMemo } from 'react';

const useNormalisedLil = (lil: LilFromDB | LilFromSubgraph) => {
    const normalisedLil = useMemo(
        () =>
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
                : lil,
        [lil]
    );

    return normalisedLil;
};

export default useNormalisedLil;
