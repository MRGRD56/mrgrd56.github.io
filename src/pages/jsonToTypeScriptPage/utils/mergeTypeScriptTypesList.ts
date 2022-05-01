import { TypeScriptType } from '../types/typescript';
import mergeTypeScriptTypes from './mergeTypeScriptTypes';
import JsonToTypeScriptConversionOptions from '../types/JsonToTypeScriptConversionOptions';

//TODO
const getMergedTypeScriptTypes = (
    types: TypeScriptType[],
    options: JsonToTypeScriptConversionOptions
): TypeScriptType => {
    return types.reduce((result, value) => {
        if (result === undefined) {
            return value;
        }

        return mergeTypeScriptTypes(result, value, options);
    }, undefined as unknown as TypeScriptType);
};

export default getMergedTypeScriptTypes;
