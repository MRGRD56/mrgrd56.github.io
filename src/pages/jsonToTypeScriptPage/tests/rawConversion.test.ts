// import getTypeScriptType from '../utils/getTypeScriptType';
// import { JsonArray, JsonObject } from '../types/json';
// import { TypeScriptArray, TypeScriptInterface, TypeScriptUnion } from '../types/typescript';
//
// test('merging', () => {
//     const jsonType = new JsonArray([
//         new JsonObject({}),
//         'number',
//         new JsonObject({}),
//         'string',
//         'string',
//         'string',
//         'number',
//         'number'
//     ]);
//
//     const expected = new TypeScriptArray(
//         new TypeScriptUnion('Root', [new TypeScriptInterface('Root2', {}), 'number', 'string'])
//     );
//
//     const actual = getTypeScriptType('Root', jsonType);
//
//     expect(actual).toBe(expected);
// });

export {};
