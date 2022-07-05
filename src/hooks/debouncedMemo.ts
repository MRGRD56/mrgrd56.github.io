import { DependencyList, useEffect, useRef, useState } from 'react';
import { debounce, isObject, throttle } from 'lodash';
import { v4 } from 'uuid';
import call from '../utils/call';
import useAutoRef from './useAutoRef';

interface NoResult {
    _noResult: string;
}

const isNoResult = <T>(value: T | NoResult, noResult: NoResult): value is NoResult => {
    return isObject(value) && '_noResult' in value && value._noResult === noResult._noResult;
};

type MemoFactory<R> = (noResult: NoResult) => R | NoResult;

const createDebouncedMemoHook =
    (debounceFn: typeof debounce) =>
    <R>(factory: MemoFactory<R>, deps: DependencyList | undefined, wait?: number) => {
        const [value, setValue] = useState<R>();
        const factoryRef = useAutoRef(factory);

        const debounceFunction = useRef(
            call(() => {
                const actualNoResult: NoResult = {
                    _noResult: v4()
                };

                return debounceFn(() => {
                    const value = factoryRef.current(actualNoResult);

                    if (!isNoResult(value, actualNoResult)) {
                        setValue(value);
                    }
                }, wait);
            })
        ).current;

        useEffect(() => {
            debounceFunction();
        }, deps);

        return value;
    };

export const useDebouncedMemo = createDebouncedMemoHook(debounce);
export const useThrottledMemo = createDebouncedMemoHook(throttle);

// const useDebouncedMemo = <T>(factory: () => T, deps: DependencyList | undefined, wait?: number) => {
//     const [value, setValue] = useState<T>();
//
//     const timeoutRef = useRef<NodeJS.Timeout>();
//
//
// };
