import { isArray } from 'lodash';

interface ValueRange<T> {
    from: T;
    to: T;
}

export function valueRange(): ValueRange<undefined>;
export function valueRange<T>(from: T, to: T): ValueRange<T>;
export function valueRange<T>(range: [T, T]): ValueRange<T>;
export function valueRange<T>(from?: T | [T, T], to?: T): ValueRange<T> {
    if (isArray(from)) {
        return {
            from: from[0],
            to: from[1]
        };
    }

    return {
        from: from as T,
        to: to as T
    };
}

export default ValueRange;
