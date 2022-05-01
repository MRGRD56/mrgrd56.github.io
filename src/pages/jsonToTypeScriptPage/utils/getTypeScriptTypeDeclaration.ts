import { DeclarableTypeScriptType, TypeScriptType } from '../types/typescript';
import { isObject } from 'lodash';
import JsonToTypeScriptConversionOptions from '../types/JsonToTypeScriptConversionOptions';

const getTypeScriptTypeDeclaration = (
    type: TypeScriptType,
    name: string,
    options: JsonToTypeScriptConversionOptions
): string => {
    if (isObject(type) && 'stringifyDeclaration' in type) {
        return type.stringifyDeclaration(options);
    }

    return new DeclarableTypeScriptType(name, type).stringifyDeclaration(options);
    //
    // return `type ${name} = ${getTypeScriptTypeReference(type)};`;
};

export default getTypeScriptTypeDeclaration;
