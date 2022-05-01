import { getAllTypeScriptTypeDeclarableTypes } from './getAllTypeScriptTypeInnerDeclarableTypes';
import { IDeclarableTypeScriptType, TypeScriptType } from '../types/typescript';
import TypeScriptDeclarationOptions from '../types/TypeScriptDeclarationOptions';

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
    name: string,
    options: TypeScriptDeclarationOptions
): string => {
    const declarableTypes = getAllTypeScriptTypeDeclarableTypes(type, name, options);

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
