import axios from 'axios';

const useApi = () => {
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
    });
};

export default useApi;
