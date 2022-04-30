import { JsonPrimitive } from './json';
import { IObject } from './common';
import getTypeScriptTypeReference from '../utils/getTypeScriptTypeReference';
import mapObject from '../../../utils/mapObject';
import ExportType from './ExportType';

export interface ITypeScriptType {
    stringifyReference(): string;
}

export interface IDeclarableTypeScriptType {
    readonly name: string;
    stringifyDeclaration(exportType?: ExportType): string;
    stringifyDeclarationBody(): string;
}

export class TypeScriptUnknown implements ITypeScriptType {
    public readonly isUnknown = true;

    stringifyReference(): string {
        return 'unknown';
    }
}

export class TypeScriptInterface extends IObject<TypeScriptType> implements ITypeScriptType, IDeclarableTypeScriptType {
    public constructor(public readonly name: string, public readonly fields: Record<string, TypeScriptType>) {
        super(fields);
    }

    stringifyDeclaration(exportType?: ExportType): string {
        return `${getExportKeyword(exportType)}interface ${this.name} ${this.stringifyDeclarationBody()}`;
    }

    stringifyDeclarationBody(): string {
        return (
            '{\n' +
            mapObject(this.fields, (key, value) => {
                return `    ${key}: ${getTypeScriptTypeReference(value)};`;
            }).join('\n') +
            '\n}'
        );
    }

    stringifyReference(): string {
        return this.name;
    }
}

export class TypeScriptArray implements ITypeScriptType {
    public constructor(public readonly type: TypeScriptType) {}

    stringifyReference(): string {
        const typeReference = getTypeScriptTypeReference(this.type);

        if (this.type instanceof TypeScriptUnion) {
            return `Array<${typeReference}>`;
        }

        return `${typeReference}[]`;
    }
}

export class TypeScriptUnion implements ITypeScriptType {
    //, IDeclarableTypeScriptType {
    public constructor(public readonly name: string, public readonly types: TypeScriptType[]) {}

    // stringifyDeclaration(exportType?: ExportType): string {
    //     return `${getExportKeyword(exportType)}type ${this.name} = ${this.stringifyDeclarationBody()};`;
    // }

    stringifyDeclarationBody(): string {
        return this.types.map(getTypeScriptTypeReference).join(' | ');
    }

    stringifyReference(): string {
        return this.stringifyDeclarationBody();
    }
}

//TODO add tuples support
export class TypeScriptTuple implements ITypeScriptType {
    public constructor(public readonly name: string, public readonly types: TypeScriptType[]) {}

    stringifyDeclarationBody(): string {
        return '[' + this.types.map(getTypeScriptTypeReference).join(', ') + ']';
    }

    stringifyReference(): string {
        return this.stringifyDeclarationBody();
    }
}

export type TypeScriptType =
    | JsonPrimitive
    | TypeScriptInterface
    | TypeScriptArray
    | TypeScriptUnion
    | TypeScriptUnknown;

const getExportKeyword = (exportType: ExportType = ExportType.NONE) => {
    return {
        [ExportType.NONE]: '',
        [ExportType.ES_MODULE]: 'export ',
        [ExportType.COMMONJS]: 'module.exports = '
    }[exportType];
};
