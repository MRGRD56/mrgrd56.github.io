import ObjectKey from '../types/common/ObjectKey';

const mapObject = <K extends ObjectKey, V, R>(
    object: Record<K, V>,
    iteratee: (key: K, value: V, index: number) => R
): R[] => {
    return Object.keys(object).map((key, index) => {
        const actualKey = key as K;
        return iteratee(actualKey, object[actualKey], index);
    });
};

export default mapObject;
