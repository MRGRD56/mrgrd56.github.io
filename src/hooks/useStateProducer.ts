import { Dispatch, SetStateAction, useCallback } from 'react';
import produce, { Draft } from 'immer';
import { Nothing } from 'immer/src/internal';

type ValidRecipeReturnType<State> = State | void | undefined | (State extends undefined ? Nothing : never);

type RecipeReturnType<State> = ValidRecipeReturnType<State> | Promise<ValidRecipeReturnType<State>>;

type Recipe<S> = (draft: Draft<S>) => RecipeReturnType<Draft<S>>;

export const produceState = <S extends object>(
    setState: Dispatch<SetStateAction<S>>,
    recipe: Recipe<S>
): void | Promise<void> => {
    setState((state) => {
        return produce(state, recipe as any);
    });
};

const useStateProducer = <S extends object>(setState: Dispatch<SetStateAction<S>>) => {
    return useCallback(
        (recipe: Recipe<S>) => {
            produceState(setState, recipe);
        },
        [setState]
    );
};

export default useStateProducer;
