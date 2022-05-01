import { chain, isString } from 'lodash';
import { TypeScriptInterface, TypeScriptObjectField, TypeScriptType, TypeScriptUnion } from '../types/typescript';

const mergeTypeScriptTypes = (a: TypeScriptType, b: TypeScriptType): TypeScriptType[] => {
    const singleType = [a];
    const bothTypes = [a, b];

    if (a.constructor !== b.constructor) {
        return bothTypes;
    }

    if (isString(a) && isString(b)) {
        return a === b ? singleType : bothTypes;
    }

    if (a instanceof TypeScriptInterface && b instanceof TypeScriptInterface) {
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

                const mergedFieldTypes = mergeTypeScriptTypes(aField.type, bField.type);
                if (mergedFieldTypes.length === 0) {
                    return result;
                }
                if (mergedFieldTypes.length === 1) {
                    result[fieldKey] = new TypeScriptObjectField(mergedFieldTypes[0], false);
                }

                result[fieldKey] = new TypeScriptObjectField(new TypeScriptUnion(fieldKey, mergedFieldTypes));
                return result;
            }, {} as Record<string, TypeScriptObjectField>)
            .value();

        return [new TypeScriptInterface(a.name, mergedFields)];
    }

    return bothTypes; //TODO
};

export default mergeTypeScriptTypes;
