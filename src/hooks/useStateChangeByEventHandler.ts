import React, { Dispatch, SetStateAction, useCallback } from 'react';
import useAutoRef from './useAutoRef';

export const handleEventTargetValueChange =
    <S>(callback: (value: S) => void, onChange?: React.ChangeEventHandler<{ value: S }>) =>
    (event: React.ChangeEvent<{ value: S }>) => {
        callback(event.target.value);
        onChange?.(event);
    };

const useStateChangeByEventHandler = <S>(
    setState: Dispatch<SetStateAction<S>>,
    onChange?: React.ChangeEventHandler<{ value: S }>
) => {
    const onChangeRef = useAutoRef(onChange);

    return useCallback(handleEventTargetValueChange(setState, onChangeRef.current), [setState]);
};

export default useStateChangeByEventHandler;
