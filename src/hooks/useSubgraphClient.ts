import { createClient, fetchExchange, cacheExchange } from 'urql';

const useSubgraphClient = () => {
    return createClient({
        url: `${process.env.SUBGRAPH_BASE_URL}/${process.env.SUBGRAPH_API_KEY}/subgraphs/id/${process.env.SUBGRAPH_ID}`,
        exchanges: [cacheExchange, fetchExchange],
    });
};

export default useSubgraphClient;
