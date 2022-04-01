import React, { Dispatch, SetStateAction, useState } from 'react';

const handleEventTargetValueChange =
    <S>(callback: (value: S) => void) =>
    (event: React.ChangeEvent<{ value: S }>) => {
        callback(event.target.value);
    };

type PossiblyUndefined<S, V> = V extends undefined ? S | undefined : S;
export type SetStateByEventAction<S> = (event: React.ChangeEvent<{ value: S }>) => void;

function useInputState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>, SetStateByEventAction<S>];
function useInputState<S = undefined>(): [
    S | undefined,
    Dispatch<SetStateAction<S | undefined>>,
    SetStateByEventAction<S | undefined>
];
function useInputState<S>(initialState?: S | (() => S)) {
    const [value, setValue] = useState<PossiblyUndefined<S, typeof initialState>>(initialState);

    return [value, setValue, handleEventTargetValueChange(setValue)];
}

export default useInputState;
