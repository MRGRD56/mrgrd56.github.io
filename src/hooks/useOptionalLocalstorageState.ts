import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { NULL_LOCALSTORAGE_KEY } from '../utils/getLocalStorageKey';
import doNothing from '../utils/doNothing';
import useWriteableLocalstorageState from './useWriteableLocalstorageState';

type UseOptionalLocalstorageStateReturnValue<S> = [S, Dispatch<SetStateAction<S>>, () => void];

const useOptionalLocalstorageState = <S>(
    key: string | undefined,
    initialState?: S | (() => S)
): UseOptionalLocalstorageStateReturnValue<S> => {
    const localstorageState = useWriteableLocalstorageState(key ?? NULL_LOCALSTORAGE_KEY, initialState);
    const [normalState, setNormalState] = useState<S>(initialState as (() => S) | S);

    return useMemo(() => {
        if (key === undefined) {
            return [normalState, setNormalState, doNothing];
        }

        return localstorageState;
    }, [key, localstorageState, normalState, setNormalState]);
};

export default useOptionalLocalstorageState;
