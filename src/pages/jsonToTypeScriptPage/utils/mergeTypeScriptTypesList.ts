import { TypeScriptType } from '../types/typescript';
import mergeTypeScriptTypes from './mergeTypeScriptTypes';

//TODO
const getMergedTypeScriptTypes = (types: TypeScriptType[]): TypeScriptType => {
    return types.reduce((result, value) => {
        if (result === undefined) {
            return value;
        }

        return mergeTypeScriptTypes(result, value);
    }, undefined as unknown as TypeScriptType);
};

export default getMergedTypeScriptTypes;
