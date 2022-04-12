type JsType = 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';

export type TypeOfJsType<T extends JsType> = T extends 'string'
    ? string
    : T extends 'number'
    ? number
    : T extends 'bigint'
    ? bigint
    : T extends 'symbol'
    ? symbol
    : T extends 'undefined'
    ? undefined
    : T extends 'object'
    ? object
    : T extends 'function'
    ? Function
    : never;

export default JsType;
