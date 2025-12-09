import { createClient } from 'urql';
import { cacheExchange, fetchExchange } from '@urql/core';

export const urqlClient = createClient({
    url: `${process.env.SUBGRAPH_BASE_URL}/${process.env.SUBGRAPH_API_KEY}/subgraphs/id/${process.env.NOUNS_SUBGRAPH_ID}`,
    exchanges: [cacheExchange, fetchExchange],
    requestPolicy: 'network-only',
    preferGetMethod: false,
});
