import { ScriptHTMLAttributes } from 'react';
import { forOwn } from 'lodash';

const appendScript = (attributes?: ScriptHTMLAttributes<any>, innerHtml?: string) =>
    new Promise<void>((resolve, reject) => {
        const scriptElement = document.createElement('script');

        if (attributes) {
            forOwn(attributes, (value, key) => {
                scriptElement.setAttribute(key, value);
            });
        }

        if (innerHtml !== undefined) {
            scriptElement.innerHTML = innerHtml;
        }

        const handleLoad = () => {
            resolve();
            scriptElement.removeEventListener('load', handleLoad);
        };

        const handleError = (reason: any) => {
            reject(reason);
            scriptElement.removeEventListener('error', handleError);
        };

        scriptElement.addEventListener('load', handleLoad);
        scriptElement.addEventListener('error', handleError);

        document.body.appendChild(scriptElement);
    });

export default appendScript;
