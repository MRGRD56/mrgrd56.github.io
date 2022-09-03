import { AxiosResponse } from 'axios';
import Switch from '../../../utils/Switch';
import MonacoLanguage from '../../../types/MonacoLanguage';
import getResponseContentType from './getResponseContentType';

const getResponseLanguage = (response: AxiosResponse): MonacoLanguage => {
    const contentType = getResponseContentType(response);

    if (!contentType) {
        return 'plaintext';
    }

    if (contentType.startsWith('xml/')) {
        return 'xml';
    }

    return Switch.of(contentType)
        .onCases<MonacoLanguage>(['text/plain'], () => 'plaintext')
        .onCases<MonacoLanguage>(['text/xml'], () => 'xml')
        .onCases<MonacoLanguage>(['text/xml', 'application/json'], () => 'json')
        .onCases<MonacoLanguage>(['text/html'], () => 'html')
        .onCases<MonacoLanguage>(['text/css'], () => 'css')
        .onCases<MonacoLanguage>(['application/javascript', 'text/javascript'], () => 'javascript')
        .onDefault<MonacoLanguage>(() => 'plaintext');
};

export default getResponseLanguage;
