import HttpMethod from './HttpMethod';

interface HttpRequest {
    method: HttpMethod;
    url: string;
}

export default HttpRequest;
