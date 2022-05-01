import {
    IDeclarableTypeScriptType,
    TypeScriptArray,
    TypeScriptType,
    TypeScriptUnion,
    TypeScriptUnknown
} from '../types/typescript';
import { isString } from 'lodash';
import mapObject from '../../../utils/mapObject';

const getAllTypeScriptTypeDeclarableTypes = (type: TypeScriptType): IDeclarableTypeScriptType[] => {
    if (isString(type) || type instanceof TypeScriptUnknown) {
        return []; //getTypeScriptTypeDeclaration(type, name, exportType)
    }

    if (type instanceof TypeScriptUnion) {
        return type.types.flatMap((innerType) => getAllTypeScriptTypeDeclarableTypes(innerType));
    }

    if (type instanceof TypeScriptArray) {
        return getAllTypeScriptTypeDeclarableTypes(type.type);
    }

    return [
        ...mapObject(type.fields, (fieldName, field) => getAllTypeScriptTypeDeclarableTypes(field.type)).flatMap(
            (value) => value
        ),
        type
    ];
};

export default getAllTypeScriptTypeDeclarableTypes;
