import { AxiosResponse } from 'axios';

const getResponseContentType = (response: AxiosResponse): string | undefined => {
    return response.headers['content-type']?.split('; ')[0];
};

export default getResponseContentType;
