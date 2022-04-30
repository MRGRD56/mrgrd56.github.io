import { IArray, IObject, IType } from './common';

export type JsonPrimitive = 'string' | 'number' | 'boolean' | 'null';

export class JsonObject extends IObject<JsonType> {
    public constructor(public readonly fields: Record<string, JsonType>) {
        super(fields);
    }
}

export class JsonArray extends IArray<JsonType> {
    public constructor(public readonly types: JsonType[]) {
        super(types);
    }
}

export type JsonType = IType<JsonPrimitive, JsonObject, JsonArray>;
