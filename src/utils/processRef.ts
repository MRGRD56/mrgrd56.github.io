import { MutableRefObject, RefObject } from 'react';
import { isNil } from 'lodash';
import NonNil from '../types/common/NonNil';
import Nil from '../types/common/Nil';

type AnyRefObject<T> = RefObject<T> | MutableRefObject<T>;

type ExtractRefType<R extends AnyRefObject<unknown>> = R extends AnyRefObject<infer T> ? T : never;

function processRef<R extends MutableRefObject<unknown>, V1>(
    ref: R,
    handler: (value: NonNil<ExtractRefType<R>>) => V1
): V1 | undefined;
function processRef<R extends MutableRefObject<unknown>, V1, V2>(
    ref: R,
    handler: (value: NonNil<ExtractRefType<R>>) => V1,
    nilHandler: (value: Extract<ExtractRefType<R>, Nil>) => V2
): V1 | V2;
function processRef<R extends MutableRefObject<unknown>, V1, V2>(
    ref: R,
    handler: (value: NonNil<ExtractRefType<R>>) => V1,
    nilHandler?: (value: Extract<ExtractRefType<R>, Nil>) => V2
): V1 | V2 | undefined {
    if (isNil(ref.current)) {
        if (!nilHandler) {
            return undefined;
        }

        return nilHandler(ref.current as Extract<ExtractRefType<R>, Nil>);
    }

    return handler(ref.current as NonNil<ExtractRefType<R>>);
}

export default processRef;

// TRASH

// type RefsToValues<Refs extends Array<MutableRefObject<any>>> =
//     Refs extends [infer RefType, ...infer RestRefTypes]
//         ? RefType extends MutableRefObject<infer Type>
//             ? RestRefTypes extends Array<MutableRefObject<any>>
//                 ? [NotNil<Type>, ...RefsToValues<RestRefTypes>]
//                 : [1]
//             : [2]
//         : [];

// type TestA = RefsToValues<[MutableRefObject<number | undefined>]>;

// const handleRefs = <Refs extends Array<MutableRefObject<any>>>(refs: Refs, handler: (values: RefsToValues<Refs>) => void): void => {
//     const values = [];
//     for (const ref of refs) {
//         if (isNil(ref.current)) {
//             return;
//         }
//
//         values.push(ref.current);
//     }
//
//     handler(values as RefsToValues<Refs>);
// };

// type UndefinedLike = undefined | void | never;

// type Voidy<T extends unknown | UndefinedLike> =
//     Extract<T, UndefinedLike> extends never
//         ? never
//         : T;
// T extends infer V | UndefinedLike
//     ? V extends UndefinedLike
//         ? never
//         : T
//     : never;

// type Simplify<T> =
//     T extends infer T1 | void | undefined
//         ? T1 extends never
//             ? T
//             : Exclude<T, void> | undefined
//         : T;
// T extends undefined
//     ? T extends void
//         ? T extends void & undefined
//             ? Exclude<T, void> | undefined
//         : 2
//     : 3
// : 4;
// T extends infer R | undefined | void
//     ? R | undefined
//     : T extends infer R | undefined
//         ? R extends never
//             ? void
//         : T
//     : T;
