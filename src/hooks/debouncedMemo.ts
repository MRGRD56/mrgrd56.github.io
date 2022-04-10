import { DependencyList, useEffect, useRef, useState } from 'react';
import { debounce, throttle } from 'lodash';

type MemoFactory<P, R> = (params: P) => R;

const createDebouncedMemoHook =
    (debounceFn: typeof debounce) =>
    <P, R>(params: P, factory: MemoFactory<P, R>, deps: DependencyList | undefined, wait?: number) => {
        const [value, setValue] = useState<R>();

        // const previousFactoryRef = useRef<MemoFactory<T>>();
        // const factoryCallback = useMemo(() => {
        //     if (factory())
        // }, []);

        const debounceFunction = useRef(
            debounceFn((params: P) => {
                const value = factory(params);
                setValue(value);
            }, wait)
        ).current;

        useEffect(() => {
            debounceFunction(params);
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
