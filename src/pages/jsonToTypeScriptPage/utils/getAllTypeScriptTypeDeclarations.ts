import getAllTypeScriptTypeDeclarableTypes from './getAllTypeScriptTypeDeclarableTypes';
import { TypeScriptType } from '../types/typescript';
import getTypeScriptTypeDeclaration from './getTypeScriptTypeDeclaration';
import ExportType from '../types/ExportType';

const getAllTypeScriptTypeDeclarations = (type: TypeScriptType, name: string, exportType?: ExportType) => {
    return getAllTypeScriptTypeDeclarableTypes(type)
        .map((declarable) => getTypeScriptTypeDeclaration(declarable as TypeScriptType, name, exportType))
        .join('\n\n');
};

export default getAllTypeScriptTypeDeclarations;
