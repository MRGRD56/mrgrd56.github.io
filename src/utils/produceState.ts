import { Dispatch, SetStateAction } from 'react';
import produce, { Draft } from 'immer';

type RecipeReturnType<S> = S | void | undefined;
export type StateProducerRecipe<S> = <D extends Draft<S>>(draft: D) => RecipeReturnType<D>;

const produceState = <S>(
    setState: Dispatch<SetStateAction<S>>,
    recipe: StateProducerRecipe<S>
): void | Promise<void> => {
    setState((state) => {
        return produce(state, recipe);
    });
};

export default produceState;
