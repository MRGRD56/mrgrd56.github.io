import { Dispatch, SetStateAction, useCallback } from 'react';

const useChangeValueStateHandler = <S>(setState: Dispatch<SetStateAction<S>>) => {
    return useCallback(
        (value: S) => {
            return () => {
                setState(value);
            };
        },
        [setState]
    );
};

export default useChangeValueStateHandler;
