import ExportType from './ExportType';

export enum NameTransformer {
    NONE = 'NONE',
    CAMEL_CASE = 'CAMEL_CASE',
    PASCAL_CASE = 'PASCAL_CASE',
    SNAKE_CASE = 'SNAKE_CASE',
    SCREAMING_SNAKE_CASE = 'SCREAMING_SNAKE_CASE',
    KEBAB_CASE = 'KEBAB_CASE'
}

interface JsonToTypeScriptConversionSelectableOptions {
    exportType: ExportType;
    isReversedOrder: boolean;
    fieldNameTransformer: NameTransformer;
    typeNameTransformer: NameTransformer;
    rootTypeName: string;
}

export default JsonToTypeScriptConversionSelectableOptions;
