import { get, PropertyPath } from 'lodash';
import moment, { MomentInput } from 'moment';

export type Comparer<T> = (a: T, b: T) => number;

export const compareNumbers: Comparer<number> = (a, b) => a - b;
export const compareNumericStrings: Comparer<string> = (a, b) => Number(a) - Number(b);
export const compareStrings: Comparer<string> = (a, b) => a.localeCompare(b);
export const compareDates: Comparer<MomentInput> = (a, b) => moment(a).diff(b);
export const compareBooleans: Comparer<boolean> = (a, b) => compareNumbers(Number(a), Number(b));

export const invertComparer =
    <T>(comparer: Comparer<T>): Comparer<T> =>
    (a, b) =>
        -comparer(a, b);

// eslint-disable-next-line @typescript-eslint/ban-types
export const compareFields =
    <Field, Object>(fieldPath: PropertyPath, comparer: Comparer<Field>): Comparer<Object> =>
    (a, b) => {
        return comparer(get(a, fieldPath), get(b, fieldPath));
    };
