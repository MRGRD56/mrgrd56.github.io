import { Dispatch, SetStateAction, useMemo } from 'react';
import useStateProducer from './useStateProducer';

const useArrayStateMutator = <T>(setState: Dispatch<SetStateAction<T[]>>) => {
    const produceState = useStateProducer(setState);

    return useMemo(() => {
        const add = (...items: T[]) => setState((state) => [...state, ...items]);
        const changeByIndex = (index: number, newItem: T) =>
            produceState((state) => {
                state[index] = newItem;
            });
        const updateByIndex = (index: number, newItem: (oldItem: T) => T) =>
            produceState((state) => {
                const oldItem = state[index];
                if (oldItem === undefined) {
                    return;
                }

                changeByIndex(index, newItem(oldItem));
            });
        const removeByIndex = (index: number) =>
            produceState((state) => {
                state.splice(index, 1);
            });
        const fpChangeByIndex = (index: number) => (newItem: T) => changeByIndex(index, newItem);
        const fpUpdateByIndex = (index: number) => (newItem: (oldItem: T) => T) => updateByIndex(index, newItem);
        const fpRemoveByIndex = (index: number) => () => removeByIndex(index);
        const clear = () => setState([]);

        return {
            add,
            changeByIndex,
            updateByIndex,
            removeByIndex,
            fpChangeByIndex,
            fpUpdateByIndex,
            fpRemoveByIndex,
            clear
        };
    }, [setState]);
};

export default useArrayStateMutator;
