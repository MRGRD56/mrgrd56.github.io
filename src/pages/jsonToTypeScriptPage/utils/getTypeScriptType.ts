import { JsonArray, JsonType } from '../types/json';
import { TypeScriptArray, TypeScriptInterface, TypeScriptObjectField, TypeScriptType } from '../types/typescript';
import { chain, isString } from 'lodash';
import { singular } from 'pluralize';
import getMergedTypeScriptTypes from './mergeTypeScriptTypesList';
import JsonToTypeScriptConversionOptions from '../types/JsonToTypeScriptConversionOptions';

const getTypeScriptType = (
    name: string,
    jsonType: JsonType,
    options: JsonToTypeScriptConversionOptions
): TypeScriptType => {
    const actualName = options.typeNameTransformer ? options.typeNameTransformer(name) : name;

    const transformTypeName = options.typeNameTransformer ?? ((typeName: string) => typeName);
    const transformFieldName = options.fieldNameTransformer ?? ((typeName: string) => typeName);

    const typeName = transformTypeName(actualName);
    const arrayElementName = singular(typeName);

    if (isString(jsonType)) {
        return jsonType;
    }

    if (jsonType instanceof JsonArray) {
        const typeScriptTypes = jsonType.types.map((type) => getTypeScriptType(arrayElementName, type, options));
        const mergedTypeScriptTypes = getMergedTypeScriptTypes(typeScriptTypes);

        return new TypeScriptArray(mergedTypeScriptTypes);
    }

    return new TypeScriptInterface(
        typeName,
        chain(jsonType.fields)
            .mapValues((field, name) => {
                return new TypeScriptObjectField(getTypeScriptType(transformFieldName(name), field, options));
            })
            .mapKeys((value, key) => transformFieldName(key))
            .value()
    );
};

export default getTypeScriptType;
