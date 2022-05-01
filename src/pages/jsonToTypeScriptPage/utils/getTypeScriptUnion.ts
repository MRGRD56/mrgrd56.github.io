import { TypeScriptType, TypeScriptUnion, TypeScriptUnknown } from '../types/typescript';
import { remove } from 'lodash';

const getTypeScriptUnion = (name: string, types: TypeScriptType[]): TypeScriptType => {
    if (types.length > 1) {
        remove(types, (type) => type instanceof TypeScriptUnknown);
    }

    if (types.length === 0) {
        return new TypeScriptUnknown();
    }
    if (types.length === 1) {
        return types[0];
    }

    return new TypeScriptUnion(name, types);
};

export default getTypeScriptUnion;
