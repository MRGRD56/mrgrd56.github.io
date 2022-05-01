import { JsonArray, JsonType } from '../types/json';
import {
    TypeScriptArray,
    TypeScriptInterface,
    TypeScriptObjectField,
    TypeScriptType,
    TypeScriptUnion,
    TypeScriptUnknown
} from '../types/typescript';
import { camelCase, isString, mapValues } from 'lodash';
import { singular } from 'pluralize';
import capitalizeFirst from '../../../utils/capitalizeFirst';
import getMergedTypeScriptTypes from './mergeTypeScriptTypesList';

const getTypeScriptType = (name: string, jsonObject: JsonType): TypeScriptType => {
    // const parsedJson = parseJsonType(object);
    //
    // if (!(parsedJson instanceof JsonObject)) {
    //     throw new Error('The parsed object is not a JsonObject');
    // }

    const typeName = capitalizeFirst(camelCase(name));
    const arrayElementName = singular(typeName);

    if (isString(jsonObject)) {
        return jsonObject;
    }

    if (jsonObject instanceof JsonArray) {
        const typeScriptTypes = jsonObject.types.map((type) => getTypeScriptType(arrayElementName, type));
        const mergedTypeScriptTypes = getMergedTypeScriptTypes(typeScriptTypes);

        if (mergedTypeScriptTypes.length === 0) {
            return new TypeScriptArray(new TypeScriptUnknown());
        }
        if (mergedTypeScriptTypes.length === 1) {
            return new TypeScriptArray(mergedTypeScriptTypes[0]);
        }

        return new TypeScriptArray(new TypeScriptUnion(arrayElementName, mergedTypeScriptTypes));
    }

    return new TypeScriptInterface(
        typeName,
        mapValues(jsonObject.fields, (field, name) => new TypeScriptObjectField(getTypeScriptType(name, field)))
    );
};

export default getTypeScriptType;
