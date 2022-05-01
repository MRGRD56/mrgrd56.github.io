import { TypeScriptType } from '../types/typescript';
import mergeTypeScriptTypes from './mergeTypeScriptTypes';
import { last } from 'lodash';

//TODO
const getMergedTypeScriptTypes = (types: TypeScriptType[]): TypeScriptType[] => {
    return types.reduce((result, value) => {
        const previous = last(result);

        if (previous === undefined) {
            return [value];
        }

        return mergeTypeScriptTypes(previous, value);
    }, [] as TypeScriptType[]);
};

export default getMergedTypeScriptTypes;
