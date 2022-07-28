import { DependencyList, EffectCallback, useRef } from 'react';
import { isEqual } from 'lodash';
import useSpecialEffect, { SpecialEffectOptions } from './useSpecialEffect';

const useDeepEffect = (effect: EffectCallback, deps: DependencyList, options?: SpecialEffectOptions) => {
    const previousDepsRef = useRef<DependencyList>();

    useSpecialEffect(
        () => {
            const previousDeps = previousDepsRef.current;
            previousDepsRef.current = deps;

            if (!isEqual(previousDeps, deps)) {
                return effect();
            }
        },
        deps,
        options
    );
};

export default useDeepEffect;
