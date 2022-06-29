import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useLocalstorageState } from 'rooks';

type UseLocalstorageStateReturnValue<S> = [S, Dispatch<SetStateAction<S>>, () => void];

const useWriteableLocalstorageState = <S>(
    key: string,
    initialState?: S | (() => S)
): UseLocalstorageStateReturnValue<S> => {
    const [lsState, setLsState, resetLsState] = useLocalstorageState<S>(key, initialState);
    const [state, setState] = useState<S>(lsState);

    useEffect(() => {
        setLsState(state as S);
    }, [state]);

    return useMemo(() => [state, setState, resetLsState], [state, setState, resetLsState]);
};

export default useWriteableLocalstorageState;
