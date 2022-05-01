import { DeclarableTypeScriptType, TypeScriptType } from '../types/typescript';
import { isObject } from 'lodash';
import TypeScriptDeclarationOptions from '../types/TypeScriptDeclarationOptions';

const getTypeScriptTypeDeclaration = (
    type: TypeScriptType,
    name: string,
    options: TypeScriptDeclarationOptions
): string => {
    if (isObject(type) && 'stringifyDeclaration' in type) {
        return type.stringifyDeclaration(options);
    }

    return new DeclarableTypeScriptType(name, type).stringifyDeclaration(options);
    //
    // return `type ${name} = ${getTypeScriptTypeReference(type)};`;
};

export default getTypeScriptTypeDeclaration;
