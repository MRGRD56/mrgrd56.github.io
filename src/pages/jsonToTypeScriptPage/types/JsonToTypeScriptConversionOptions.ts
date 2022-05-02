import ExportType from './ExportType';

export enum NullType {
    NULL = 'null',
    UNDEFINED = 'undefined'
}

export enum UnknownType {
    UNKNOWN = 'unknown',
    ANY = 'any'
}

interface JsonToTypeScriptConversionOptions {
    exportType?: ExportType;
    isReversedOrder?: boolean;
    fieldNameTransformer?: (fieldName: string) => string;
    typeNameTransformer?: (typeName: string) => string;
    rootTypeName: string;
    isTuplesEnabled?: boolean;
    nullType?: NullType;
    unknownType?: UnknownType;
}

export default JsonToTypeScriptConversionOptions;
