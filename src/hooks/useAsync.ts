import { useCallback, useEffect, useState } from 'react';
import { isFunction } from 'lodash';

export interface AsyncHookParams<T> {
    onSuccess?: (data: T) => void;
    onError?: (error: unknown) => void;
    onComplete?: () => void;
    onLoadingChange?: (isLoading: boolean) => void;
    onErrorChange?: (error: unknown) => void;
    isLoadingInitial?: boolean;
    errorInitial?: boolean;
    doInvokeOnMount?: boolean;
}

const useAsync = <T>(promiseFn: (() => Promise<T>) | Promise<T>, params?: AsyncHookParams<T>) => {
    const {
        onSuccess,
        onError,
        onComplete,
        onLoadingChange,
        onErrorChange,
        isLoadingInitial,
        errorInitial,
        doInvokeOnMount
    } = params ?? {};

    const [isLoading, setIsLoading] = useState<boolean>(isLoadingInitial ?? false);
    const [error, setError] = useState<unknown>(errorInitial);

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

            onSuccess?.(result);
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
        invoke,
        isLoading,
        error
    };
};

export default useAsync;
