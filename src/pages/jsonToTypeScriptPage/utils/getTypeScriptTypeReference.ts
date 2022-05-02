import { TypeScriptType } from '../types/typescript';
import { isString } from 'lodash';
import JsonToTypeScriptConversionOptions from '../types/JsonToTypeScriptConversionOptions';

const getTypeScriptTypeReference = (type: TypeScriptType, options: JsonToTypeScriptConversionOptions): string => {
    if (isString(type)) {
        if (type === 'null') {
            return options.nullType ?? type;
        }

        return type;
    }

    return type.stringifyReference(options);
};

export default getTypeScriptTypeReference;
