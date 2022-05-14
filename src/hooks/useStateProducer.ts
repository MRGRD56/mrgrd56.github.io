import { Dispatch, SetStateAction, useCallback } from 'react';
import produceState, { StateProducerRecipe } from '../utils/produceState';

const useStateProducer = <S extends object>(setState: Dispatch<SetStateAction<S>>) => {
    return useCallback(
        (recipe: StateProducerRecipe<S>) => {
            produceState(setState, recipe);
        },
        [setState]
    );
};

export default useStateProducer;
