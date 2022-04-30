import { TypeScriptType } from '../types/typescript';
import { isString } from 'lodash';

const getTypeScriptTypeReference = (type: TypeScriptType): string => {
    if (isString(type)) {
        return type;
    }

    return type.stringifyReference();
};

export default getTypeScriptTypeReference;
