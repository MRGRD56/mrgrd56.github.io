import { getAllTypeScriptTypeDeclarableTypes } from './getAllTypeScriptTypeInnerDeclarableTypes';
import { IDeclarableTypeScriptType, TypeScriptType } from '../types/typescript';
import JsonToTypeScriptConversionOptions from '../types/JsonToTypeScriptConversionOptions';

const renameConflictingType = (
    type: IDeclarableTypeScriptType,
    isConflicting: (type: IDeclarableTypeScriptType) => boolean
): void => {
    const match = /^(.*?)(\d+)$/.exec(type.name);
    if (!match) {
        type.name += '2';
    } else {
        const [, left, numericPart] = match;
        const numeric = Number(numericPart);
        type.name = `${left}${numeric + 1}`;
    }

    if (isConflicting(type)) {
        renameConflictingType(type, isConflicting);
    }
};

const getAllTypeScriptTypeDeclarations = (
    type: TypeScriptType,
    rootName: string,
    options: JsonToTypeScriptConversionOptions
): string => {
    const actualRootName = options.typeNameTransformer ? options.typeNameTransformer(rootName) : rootName;

    const declarableTypes = getAllTypeScriptTypeDeclarableTypes(type, actualRootName, options);

    const correctlyNamedDeclarableTypes: IDeclarableTypeScriptType[] = [];

    declarableTypes.forEach((declarableType) => {
        const isConflicting = (type: IDeclarableTypeScriptType) =>
            correctlyNamedDeclarableTypes.some((value) => value.name === type.name);

        if (isConflicting(declarableType)) {
            renameConflictingType(declarableType, isConflicting);
        }

        correctlyNamedDeclarableTypes.push(declarableType);
    });

    return declarableTypes.map((declarable) => declarable.stringifyDeclaration(options)).join('\n\n');
};

export default getAllTypeScriptTypeDeclarations;
