import getTypeScriptType from './getTypeScriptType';
import getJsonType from './getJsonType';
import getAllTypeScriptTypeDeclarations from './getAllTypeScriptTypeDeclarations';
import JsonToTypeScriptConversionOptions from '../types/JsonToTypeScriptConversionOptions';

const convertJsonToTypeScript = (json: string, options: JsonToTypeScriptConversionOptions): string => {
    const jsonObject = JSON.parse(json);
    const jsonType = getJsonType(jsonObject);

    const { rootTypeName } = options;

    const typeScriptType = getTypeScriptType(rootTypeName, jsonType, options);
    return getAllTypeScriptTypeDeclarations(typeScriptType, rootTypeName, options);
};

export default convertJsonToTypeScript;
