import ExportType from './ExportType';

interface JsonToTypeScriptConversionOptions {
    exportType?: ExportType;
    isReversedOrder?: boolean;
    fieldNameTransformer?: (fieldName: string) => string;
    typeNameTransformer?: (typeName: string) => string;
    rootTypeName: string;
    isTuplesEnabled?: boolean;
}

export default JsonToTypeScriptConversionOptions;
