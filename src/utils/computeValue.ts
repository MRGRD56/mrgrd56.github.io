import { isFunction } from 'lodash';

const computeValue = <T>(value: T | (() => T)): T => {
    return isFunction(value) ? value() : value;
};

export default computeValue;
