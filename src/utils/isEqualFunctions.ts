// eslint-disable-next-line @typescript-eslint/ban-types
import { isEqual, isFunction } from 'lodash';

const isEqualFunctions = (f1: unknown, f2: unknown): boolean => {
    return f1 === f2 || (isFunction(f1) && isFunction(f2) ? f1.toString() === f2.toString() : isEqual(f1, f2));
};

export default isEqualFunctions;
