import { TypeScriptType } from '../types/typescript';
import { isString } from 'lodash';
import ExportType from '../types/ExportType';

const getTypeScriptTypeDeclaration = (type: TypeScriptType, name: string, exportType?: ExportType): string => {
    if (isString(type)) {
        return `type ${name} = ${type};`;
    }

    if ('stringifyDeclaration' in type) {
        return type.stringifyDeclaration(exportType);
    }

    return '';
};

export default getTypeScriptTypeDeclaration;
