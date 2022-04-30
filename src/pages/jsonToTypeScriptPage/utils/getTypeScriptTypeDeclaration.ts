import { TypeScriptType } from '../types/typescript';
import { isObject } from 'lodash';
import ExportType from '../types/ExportType';
import getTypeScriptTypeReference from './getTypeScriptTypeReference';

const getTypeScriptTypeDeclaration = (type: TypeScriptType, name: string, exportType?: ExportType): string => {
    if (isObject(type) && 'stringifyDeclaration' in type) {
        return type.stringifyDeclaration(exportType);
    }

    return `type ${name} = ${getTypeScriptTypeReference(type)};`;
};

export default getTypeScriptTypeDeclaration;
