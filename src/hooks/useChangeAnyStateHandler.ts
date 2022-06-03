import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { isObjectLike } from 'lodash';
import call from '../utils/call';

export const isChangeEvent = (value: any): value is ChangeEvent<unknown> => {
    return isObjectLike(value) && 'target' in value;
};

const useChangeAnyStateHandler = <S>(setState: Dispatch<SetStateAction<S>>) => {
    return (value: ChangeEvent<{ value: S }> | S) => {
        const actualValue = call(() => {
            if (isChangeEvent(value)) {
                const event = value as ChangeEvent<{ value: S }>;
                return event.target.value;
            }

            return value;
        });

        setState(actualValue);
    };
};

export default useChangeAnyStateHandler;
