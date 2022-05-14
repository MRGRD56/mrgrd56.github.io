import { Dispatch, SetStateAction } from 'react';
import produce, { Draft } from 'immer';
import { Nothing } from 'immer/src/internal';

type ValidRecipeReturnType<State> = State | void | undefined | (State extends undefined ? Nothing : never);

type RecipeReturnType<State> = ValidRecipeReturnType<State> | Promise<ValidRecipeReturnType<State>>;

export type StateProducerRecipe<S> = (draft: Draft<S>) => RecipeReturnType<Draft<S>>;

const produceState = <S extends object>(
    setState: Dispatch<SetStateAction<S>>,
    recipe: StateProducerRecipe<S>
): void | Promise<void> => {
    setState((state) => {
        return produce(state, recipe as any);
    });
};

export default produceState;
