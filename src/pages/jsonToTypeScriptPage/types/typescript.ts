import { JsonPrimitive } from './json';
import getTypeScriptTypeReference from '../utils/getTypeScriptTypeReference';
import mapObject from '../../../utils/mapObject';
import ExportType from './ExportType';
import { filter, isObject, isString } from 'lodash';
import JsonToTypeScriptConversionOptions from './JsonToTypeScriptConversionOptions';
import isValidJsIdentifier, { isValidTsTypeFieldName } from '../../../utils/isValidJsIdentifier';

export interface ITypeScriptType {
    stringifyReference(): string;
}

export interface IDeclarable {
    stringifyDeclarationBody(): string;
}

export interface IDeclarableTypeScriptType extends IDeclarable {
    name: string;
    stringifyDeclaration(options: JsonToTypeScriptConversionOptions): string;
}

export class DeclarableTypeScriptType implements IDeclarableTypeScriptType {
    constructor(name: string, type: IDeclarableTypeScriptType | TypeScriptType) {
        this.name = name;
        this.type = type;
    }

    public readonly name: string;
    private readonly type: IDeclarableTypeScriptType | TypeScriptType;

    stringifyDeclaration(options: JsonToTypeScriptConversionOptions): string {
        if (isObject(this.type) && 'stringifyDeclaration' in this.type) {
            return this.type.stringifyDeclaration(options);
        }

        return `${getExportKeyword(options.exportType)}type ${stringifyTypeName(
            this.name
        )} = ${this.stringifyDeclarationBody()};`;
    }

    stringifyDeclarationBody(): string {
        if (isString(this.type)) {
            return this.type;
        }

        return 'stringifyDeclarationBody' in this.type
            ? this.type.stringifyDeclarationBody()
            : 'stringifyReference' in this.type
            ? this.type.stringifyReference()
            : '';
    }
}

export class TypeScriptUnknown implements ITypeScriptType {
    public readonly isUnknown = true;

    stringifyReference(): string {
        return 'unknown';
    }
}

export class TypeScriptObjectField implements IDeclarable {
    public constructor(public readonly type: TypeScriptType, public readonly isOptional = false) {}

    stringifyDeclarationBody(): string {
        return `${this.isOptional ? '?' : ''}: ${getTypeScriptTypeReference(this.type)}`;
    }
}

export class TypeScriptInterface implements ITypeScriptType, IDeclarableTypeScriptType {
    public constructor(public name: string, public readonly fields: Record<string, TypeScriptObjectField>) {}

    stringifyDeclaration({ exportType }: JsonToTypeScriptConversionOptions): string {
        return `${getExportKeyword(
            exportType
        )}interface ${this.stringifyReference()} ${this.stringifyDeclarationBody()}`;
    }

    stringifyDeclarationBody(): string {
        return (
            '{\n' +
            mapObject(this.fields, (key, field) => {
                return `    ${stringifyFieldName(key)}${field.stringifyDeclarationBody()};`;
            }).join('\n') +
            '\n}'
        );
    }

    stringifyReference(): string {
        return stringifyTypeName(this.name);
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
    public constructor(public name: string, public readonly types: TypeScriptType[]) {}

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
    public constructor(public name: string, public readonly types: TypeScriptType[]) {}

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

const stringifyFieldName = (name: string) => {
    if (isValidTsTypeFieldName(name)) {
        return name;
    }

    return `'${name}'`;
};

const stringifyTypeName = (name: string) => {
    if (isValidJsIdentifier(name)) {
        return name;
    }

    let result = name;

    if (!result?.trim()) {
        result = 'Type';
    }

    if (/^\d$/.test(result[0])) {
        result = 'N' + result;
    }

    return filter(result, isValidTsTypeFieldName).join('');
};
