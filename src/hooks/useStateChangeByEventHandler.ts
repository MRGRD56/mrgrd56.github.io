import React, { Dispatch, SetStateAction, useCallback } from 'react';

export const handleEventTargetValueChange =
    <S>(callback: (value: S) => void) =>
    (event: React.ChangeEvent<{ value: S }>) => {
        callback(event.target.value);
    };

const useStateChangeByEventHandler = <S>(setState: Dispatch<SetStateAction<S>>) => {
    return useCallback(handleEventTargetValueChange(setState), [setState]);
};

export default useStateChangeByEventHandler;
