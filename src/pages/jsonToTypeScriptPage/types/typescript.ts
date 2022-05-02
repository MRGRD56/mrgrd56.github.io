import { JsonPrimitive } from './json';
import getTypeScriptTypeReference from '../utils/getTypeScriptTypeReference';
import mapObject from '../../../utils/mapObject';
import ExportType from './ExportType';
import { filter, isObject, isString } from 'lodash';
import JsonToTypeScriptConversionOptions, { ObjectDeclaration } from './JsonToTypeScriptConversionOptions';
import isValidJsIdentifier, { isValidTsTypeFieldName } from '../../../utils/isValidJsIdentifier';

export interface ITypeScriptType {
    stringifyReference(options: JsonToTypeScriptConversionOptions): string;
}

export interface IDeclarable {
    stringifyDeclarationBody(options: JsonToTypeScriptConversionOptions): string;
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
        )} = ${this.stringifyDeclarationBody(options)};`;
    }

    stringifyDeclarationBody(options: JsonToTypeScriptConversionOptions): string {
        if (isString(this.type)) {
            return getTypeScriptTypeReference(this.type, options);
        }

        return 'stringifyDeclarationBody' in this.type
            ? this.type.stringifyDeclarationBody(options)
            : 'stringifyReference' in this.type
            ? this.type.stringifyReference(options)
            : '';
    }
}

export class TypeScriptUnknown implements ITypeScriptType {
    public readonly isUnknown = true;

    stringifyReference(options: JsonToTypeScriptConversionOptions): string {
        return options.unknownType ?? 'unknown';
    }
}

export class TypeScriptObjectField implements IDeclarable {
    public constructor(public readonly type: TypeScriptType, public readonly isOptional = false) {}

    stringifyDeclarationBody(options: JsonToTypeScriptConversionOptions): string {
        return `${this.isOptional ? '?' : ''}: ${getTypeScriptTypeReference(this.type, options)}`;
    }
}

export class TypeScriptObject implements ITypeScriptType, IDeclarableTypeScriptType {
    public constructor(public name: string, public readonly fields: Record<string, TypeScriptObjectField>) {}

    stringifyDeclaration(options: JsonToTypeScriptConversionOptions): string {
        const exportKeyword = getExportKeyword(options.exportType);
        const name = this.stringifyReference(options);
        const declarationBody = this.stringifyDeclarationBody(options);

        const declarationType = options.objectDeclaration ?? ObjectDeclaration.INTERFACE;

        const declarations: Readonly<Record<ObjectDeclaration, string>> = {
            [ObjectDeclaration.INTERFACE]: `${exportKeyword}interface ${name} ${declarationBody}`,
            [ObjectDeclaration.TYPE]: `${exportKeyword}type ${name} = ${declarationBody};`
        };

        return declarations[declarationType];
    }

    stringifyDeclarationBody(options: JsonToTypeScriptConversionOptions): string {
        return (
            '{\n' +
            mapObject(this.fields, (key, field) => {
                return `    ${stringifyFieldName(key)}${field.stringifyDeclarationBody(options)};`;
            }).join('\n') +
            '\n}'
        );
    }

    stringifyReference(options: JsonToTypeScriptConversionOptions): string {
        return stringifyTypeName(this.name);
    }
}

export class TypeScriptArray implements ITypeScriptType {
    public constructor(public readonly type: TypeScriptType) {}

    stringifyReference(options: JsonToTypeScriptConversionOptions): string {
        const typeReference = getTypeScriptTypeReference(this.type, options);

        if (this.type instanceof TypeScriptUnion) {
            return `Array<${typeReference}>`;
        }

        return `${typeReference}[]`;
    }
}

export abstract class TypeScriptTypesCombination implements ITypeScriptType {
    protected constructor(public name: string, public readonly types: TypeScriptType[]) {}

    abstract stringifyReference(options: JsonToTypeScriptConversionOptions): string;
}

export class TypeScriptUnion extends TypeScriptTypesCombination {
    //, IDeclarableTypeScriptType {
    public constructor(public name: string, public readonly types: TypeScriptType[]) {
        super(name, types);
    }

    // stringifyDeclaration(exportType?: ExportType): string {
    //     return `${getExportKeyword(exportType)}type ${this.name} = ${this.stringifyDeclarationBody()};`;
    // }

    stringifyDeclarationBody(options: JsonToTypeScriptConversionOptions): string {
        return this.types.map((type) => getTypeScriptTypeReference(type, options)).join(' | ');
    }

    stringifyReference(options: JsonToTypeScriptConversionOptions): string {
        return this.stringifyDeclarationBody(options);
    }
}

export class TypeScriptTuple extends TypeScriptTypesCombination {
    public constructor(public name: string, public readonly types: TypeScriptType[]) {
        super(name, types);
    }

    stringifyDeclarationBody(options: JsonToTypeScriptConversionOptions): string {
        return '[' + this.types.map((type) => getTypeScriptTypeReference(type, options)).join(', ') + ']';
    }

    stringifyReference(options: JsonToTypeScriptConversionOptions): string {
        return this.stringifyDeclarationBody(options);
    }
}

export type TypeScriptType =
    | JsonPrimitive
    | TypeScriptObject
    | TypeScriptArray
    | TypeScriptUnion
    | TypeScriptTuple
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
