import { camelCase, isNil } from 'lodash';

//https://stackoverflow.com/a/50620653/14899408

const camelizeKeys = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map((v) => camelizeKeys(v));
    } else if (!isNil(obj) && obj.constructor === Object) {
        return Object.keys(obj).reduce(
            (result, key) => ({
                ...result,
                [camelCase(key)]: camelizeKeys(obj[key])
            }),
            {}
        );
    }
    return obj;
};

export default camelizeKeys;
