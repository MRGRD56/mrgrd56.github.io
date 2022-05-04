import axios, { AxiosInstance } from 'axios';
import call from '../../utils/call';
import camelizeKeys from '../../utils/camelizeKeys';

const appAxios = call<AxiosInstance>(() => {
    const instance = axios.create();

    instance.interceptors.response.use((response) => {
        response.data = camelizeKeys(response.data);
        return response;
    });

    return instance;
});

export default appAxios;
