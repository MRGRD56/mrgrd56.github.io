import { isNil } from 'lodash';

const isNotNil = <T>(value: T): value is Exclude<T, null | undefined> => {
    return !isNil(value);
};

export default isNotNil;
