import JsonToTypeScriptConversionOptions from './JsonToTypeScriptConversionOptions';

export enum NameTransformer {
    NONE = 'NONE',
    CAMEL_CASE = 'CAMEL_CASE',
    PASCAL_CASE = 'PASCAL_CASE',
    SNAKE_CASE = 'SNAKE_CASE',
    SCREAMING_SNAKE_CASE = 'SCREAMING_SNAKE_CASE',
    KEBAB_CASE = 'KEBAB_CASE'
}

interface JsonToTypeScriptConversionSelectableOptions
    extends Required<Omit<JsonToTypeScriptConversionOptions, 'typeNameTransformer' | 'fieldNameTransformer'>> {
    fieldNameTransformer: NameTransformer;
    typeNameTransformer: NameTransformer;
}

export default JsonToTypeScriptConversionSelectableOptions;
