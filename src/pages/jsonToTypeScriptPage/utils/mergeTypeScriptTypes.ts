import { chain, isString, uniq } from 'lodash';
import {
    TypeScriptArray,
    TypeScriptObject,
    TypeScriptObjectField,
    TypeScriptType,
    TypeScriptUnion
} from '../types/typescript';
import getTypeScriptUnion from './getTypeScriptUnion';
import JsonToTypeScriptConversionOptions from '../types/JsonToTypeScriptConversionOptions';

const mergeTypeScriptTypes = (
    a: TypeScriptType,
    b: TypeScriptType,
    options: JsonToTypeScriptConversionOptions
): TypeScriptType => {
    const singleType = a;
    const bothTypes = getTypeScriptUnion('', [a, b]);

    if (isString(a) && isString(b)) {
        return a === b ? singleType : bothTypes;
    }

    if (a instanceof TypeScriptObject && b instanceof TypeScriptObject) {
        const aKeys = Object.keys(a.fields);
        const bKeys = Object.keys(b.fields);

        const allKeys = chain([aKeys, bKeys]).flatMap().uniq().value();

        const mergedFields = chain(allKeys)
            .reduce((result, fieldKey) => {
                const aHasKey = aKeys.includes(fieldKey);
                const bHasKey = bKeys.includes(fieldKey);

                const aField = a.fields[fieldKey];
                const bField = b.fields[fieldKey];

                if (!aHasKey && !bHasKey) {
                    console.error('Both keys are undefined');
                    return result;
                }

                if (aHasKey && !bHasKey) {
                    result[fieldKey] = new TypeScriptObjectField(aField.type, true);
                    return result;
                }

                if (!aHasKey && bHasKey) {
                    result[fieldKey] = new TypeScriptObjectField(bField.type, true);
                    return result;
                }

                //has both keys

                const isOptional = aField.isOptional || bField.isOptional;

                const mergedFieldType = mergeTypeScriptTypes(aField.type, bField.type, options);

                result[fieldKey] = new TypeScriptObjectField(mergedFieldType, isOptional);
                return result;
            }, {} as Record<string, TypeScriptObjectField>)
            .value();

        return new TypeScriptObject(a.name, mergedFields);
    }

    if (a instanceof TypeScriptArray && b instanceof TypeScriptArray) {
        const mergedTypes = mergeTypeScriptTypes(a.type, b.type, options);
        return new TypeScriptArray(mergedTypes);
    }

    if (a instanceof TypeScriptUnion || b instanceof TypeScriptUnion) {
        if (a instanceof TypeScriptUnion && b instanceof TypeScriptUnion) {
            return new TypeScriptUnion(a.name, uniq([...a.types, ...b.types]));
        }

        const union = a instanceof TypeScriptUnion ? a : b instanceof TypeScriptUnion ? b : undefined;
        const notUnion = a instanceof TypeScriptUnion ? b : b instanceof TypeScriptUnion ? a : undefined;

        if (union === undefined || notUnion === undefined) {
            throw new Error();
        }

        const defaultResult = new TypeScriptUnion(union.name, uniq([...union.types, notUnion]));

        if (isString(notUnion)) {
            return defaultResult;
        }

        const unionSameTypeIndex = union.types.findIndex((value) => value.constructor === notUnion.constructor);

        if (unionSameTypeIndex === -1) {
            return defaultResult;
        }

        const unionObject = union.types[unionSameTypeIndex];
        union.types[unionSameTypeIndex] = mergeTypeScriptTypes(unionObject, notUnion, options);
        return union;
    }

    return bothTypes; //TODO
};

export default mergeTypeScriptTypes;
