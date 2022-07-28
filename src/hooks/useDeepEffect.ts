import { DependencyList, EffectCallback, useEffect, useRef } from 'react';
import { isEqual } from 'lodash';

const useDeepEffect = (effect: EffectCallback, deps: DependencyList) => {
    const previousDepsRef = useRef<DependencyList>();

    useEffect(() => {
        const previousDeps = previousDepsRef.current;
        previousDepsRef.current = deps;

        if (!isEqual(previousDeps, deps)) {
            return effect();
        }
    }, deps);
};

export default useDeepEffect;
