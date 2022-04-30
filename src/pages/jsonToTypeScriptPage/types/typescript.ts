import { JsonPrimitive } from './json';
import { IObject } from './common';

export class TypeScriptUnknown {
    public readonly isUnknown = true;
}

export class TypeScriptInterface extends IObject<TypeScriptType> {
    public constructor(public readonly name: string, public readonly fields: Record<string, TypeScriptType>) {
        super(fields);
    }
}

export class TypeScriptArray {
    public constructor(public readonly type: TypeScriptType) {}
}

export class TypeScriptUnion {
    public constructor(public readonly name: string, public readonly types: TypeScriptType[]) {}
}

export type TypeScriptType =
    | JsonPrimitive
    | TypeScriptInterface
    | TypeScriptArray
    | TypeScriptUnion
    | TypeScriptUnknown;
