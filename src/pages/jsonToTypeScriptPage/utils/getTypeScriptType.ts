import { JsonArray, JsonType } from '../types/json';
import {
    TypeScriptArray,
    TypeScriptInterface,
    TypeScriptType,
    TypeScriptUnion,
    TypeScriptUnknown
} from '../types/typescript';
import { camelCase, isString, mapValues } from 'lodash';
import { singular } from 'pluralize';
import capitalizeFirst from '../../../utils/capitalizeFirst';

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
        if (jsonObject.types.length === 0) {
            return new TypeScriptArray(new TypeScriptUnknown());
        }
        if (jsonObject.types.length === 1) {
            return new TypeScriptArray(getTypeScriptType(arrayElementName, jsonObject.types[0]));
        }

        return new TypeScriptArray(
            new TypeScriptUnion(
                arrayElementName,
                jsonObject.types.map((type) => getTypeScriptType(arrayElementName, type))
            )
        );
    }

    return new TypeScriptInterface(
        typeName,
        mapValues(jsonObject.fields, (field, name) => getTypeScriptType(name, field))
    );
};

export default getTypeScriptType;
