import { JsonArray, JsonType } from '../types/json';
import { TypeScriptArray, TypeScriptInterface, TypeScriptObjectField, TypeScriptType } from '../types/typescript';
import { isString, mapValues } from 'lodash';
import { singular } from 'pluralize';
import getMergedTypeScriptTypes from './mergeTypeScriptTypesList';
import pascalCase from '../../../utils/pascalCase';

const getTypeScriptType = (name: string, jsonObject: JsonType): TypeScriptType => {
    const typeName = pascalCase(name);
    const arrayElementName = singular(typeName);

    if (isString(jsonObject)) {
        return jsonObject;
    }

    if (jsonObject instanceof JsonArray) {
        const typeScriptTypes = jsonObject.types.map((type) => getTypeScriptType(arrayElementName, type));
        const mergedTypeScriptTypes = getMergedTypeScriptTypes(typeScriptTypes);

        return new TypeScriptArray(mergedTypeScriptTypes);
    }

    return new TypeScriptInterface(
        typeName,
        mapValues(jsonObject.fields, (field, name) => new TypeScriptObjectField(getTypeScriptType(name, field)))
    );
};

export default getTypeScriptType;
