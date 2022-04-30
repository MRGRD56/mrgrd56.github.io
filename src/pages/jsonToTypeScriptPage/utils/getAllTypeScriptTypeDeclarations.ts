import getAllTypeScriptTypeDeclarableTypes from './getAllTypeScriptTypeDeclarableTypes';
import { TypeScriptType } from '../types/typescript';
import getTypeScriptTypeDeclaration from './getTypeScriptTypeDeclaration';
import ExportType from '../types/ExportType';

const getAllTypeScriptTypeDeclarations = (type: TypeScriptType, name: string, exportType?: ExportType) => {
    const declarableTypes = getAllTypeScriptTypeDeclarableTypes(type);

    if (declarableTypes.length === 0) {
        return getTypeScriptTypeDeclaration(type, name, exportType);
    }

    return declarableTypes
        .map((declarable) => getTypeScriptTypeDeclaration(declarable as TypeScriptType, name, exportType))
        .join('\n\n');
};

export default getAllTypeScriptTypeDeclarations;
