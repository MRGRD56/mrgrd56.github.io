import getTypeScriptType from './getTypeScriptType';
import parseJsonObject from './parseJsonObject';
import getAllTypeScriptTypeDeclarations from './getAllTypeScriptTypeDeclarations';
import TypeScriptDeclarationOptions from '../types/TypeScriptDeclarationOptions';

const rootName = 'Root';

const convertJsonToTypeScript = (json: string, options: TypeScriptDeclarationOptions): string => {
    const typeScriptType = getTypeScriptType(rootName, parseJsonObject(JSON.parse(json)));
    return getAllTypeScriptTypeDeclarations(typeScriptType, rootName, options);
};

export default convertJsonToTypeScript;
