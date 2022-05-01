import {
    DeclarableTypeScriptType,
    IDeclarableTypeScriptType,
    TypeScriptArray,
    TypeScriptType,
    TypeScriptUnion,
    TypeScriptUnknown
} from '../types/typescript';
import { isObject, isString } from 'lodash';
import mapObject from '../../../utils/mapObject';
import JsonToTypeScriptConversionOptions from '../types/JsonToTypeScriptConversionOptions';

const getAllTypeScriptTypeInnerDeclarableTypes = (
    type: TypeScriptType,
    options: JsonToTypeScriptConversionOptions,
    includeSelf = false
): IDeclarableTypeScriptType[] => {
    if (isString(type) || type instanceof TypeScriptUnknown) {
        return []; //getTypeScriptTypeDeclaration(type, name, exportType)
    }

    if (type instanceof TypeScriptUnion) {
        return type.types.flatMap((innerType) => getAllTypeScriptTypeInnerDeclarableTypes(innerType, options, true));
    }

    if (type instanceof TypeScriptArray) {
        return getAllTypeScriptTypeInnerDeclarableTypes(type.type, options, true);
    }

    const result = mapObject(type.fields, (fieldName, field) =>
        getAllTypeScriptTypeInnerDeclarableTypes(field.type, options, true)
    ).flatMap((value) => value);

    if (includeSelf) {
        if (options.isReversedOrder) {
            result.unshift(type);
        } else {
            result.push(type);
        }
    }

    return result;
};

export const getAllTypeScriptTypeDeclarableTypes = (
    type: TypeScriptType,
    name: string,
    options: JsonToTypeScriptConversionOptions
): IDeclarableTypeScriptType[] => {
    const declarableTypes: IDeclarableTypeScriptType[] = getAllTypeScriptTypeInnerDeclarableTypes(type, options);

    const declarableSelf: IDeclarableTypeScriptType =
        isObject(type) && 'stringifyDeclaration' in type ? type : new DeclarableTypeScriptType(name, type);

    if (options.isReversedOrder) {
        declarableTypes.unshift(declarableSelf);
    } else {
        declarableTypes.push(declarableSelf);
    }

    return declarableTypes;
};

export default getAllTypeScriptTypeInnerDeclarableTypes;
