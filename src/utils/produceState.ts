import { Dispatch, SetStateAction } from 'react';
import produce from 'immer';

type RecipeReturnType<S> = S | void | undefined;
export type StateProducerRecipe<S> = (draft: S) => RecipeReturnType<S>;

const produceState = <S>(setState: Dispatch<SetStateAction<S>>, recipe: StateProducerRecipe<S>): void => {
    setState((state) => {
        return produce(state, recipe);
    });
};

export default produceState;
