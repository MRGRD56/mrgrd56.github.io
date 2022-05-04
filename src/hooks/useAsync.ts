import { useCallback, useEffect, useState } from 'react';
import { isFunction } from 'lodash';

export interface AsyncHookParams<T> {
    onSuccess?: (data: T) => void;
    onError?: (error: unknown) => void;
    onComplete?: () => void;
    onLoadingChange?: (isLoading: boolean) => void;
    onErrorChange?: (error: unknown) => void;
    initialResult?: T;
    initialIsLoading?: boolean;
    initialError?: boolean;
    doInvokeOnMount?: boolean;
}

const useAsync = <T>(promiseFn: (() => Promise<T>) | Promise<T>, params?: AsyncHookParams<T>) => {
    const {
        onSuccess,
        onError,
        onComplete,
        onLoadingChange,
        onErrorChange,
        initialResult,
        initialIsLoading,
        initialError,
        doInvokeOnMount
    } = params ?? {};

    const [result, setResult] = useState<T | undefined>(initialResult);
    const [isLoading, setIsLoading] = useState<boolean>(initialIsLoading ?? false);
    const [error, setError] = useState<unknown>(initialError);

    const changeResult = useCallback(
        (value: T) => {
            setResult(value);
            onSuccess?.(value);
        },
        [onSuccess]
    );

    const changeLoading = useCallback(
        (value: boolean) => {
            setIsLoading(value);
            onLoadingChange?.(value);
        },
        [onLoadingChange]
    );

    const changeError = useCallback(
        (value: unknown) => {
            setError(value);
            onErrorChange?.(value);
        },
        [onErrorChange]
    );

    const invoke = useCallback(async () => {
        try {
            changeLoading(true);
            changeError(undefined);

            const result: T = isFunction(promiseFn) ? await promiseFn() : await promiseFn;

            changeResult(result);
        } catch (e) {
            changeError(e);
            onError?.(e);
        } finally {
            changeLoading(false);
            onComplete?.();
        }
    }, [changeLoading, changeError, promiseFn, onSuccess, onError, onComplete]);

    useEffect(() => {
        if (doInvokeOnMount) {
            invoke();
        }
    }, []);

    return {
        result,
        invoke,
        isLoading,
        error
    };
};

export default useAsync;
