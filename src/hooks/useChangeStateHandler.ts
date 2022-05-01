import { ChangeEvent, Dispatch, SetStateAction, useCallback } from 'react';
import call from '../utils/call';
import { isObjectLike } from 'lodash';
import useChangeState from './useChangeState';

const isChangeEvent = (value: any): value is ChangeEvent<unknown> => {
    return isObjectLike(value) && 'target' in value;
};

const useChangeStateHandler = <S extends object>(setState: Dispatch<SetStateAction<S>>) => {
    const changeState = useChangeState(setState);

    return useCallback(
        <K extends keyof S, T extends S[K]>(key: K) => {
            return (value: ChangeEvent<{ value: T }> | T) => {
                const actualValue = call(() => {
                    if (isChangeEvent(value)) {
                        const event = value as ChangeEvent<{ value: T }>;
                        return event.target.value;
                    }

                    return value;
                });

                changeState(key, actualValue);
            };
        },
        [changeState]
    );
};

export default useChangeStateHandler;
