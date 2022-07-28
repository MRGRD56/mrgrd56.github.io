import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export interface SpecialEffectOptions {
    skipFirstRender?: boolean;
}

const useSpecialEffect = (effect: EffectCallback, deps: DependencyList, options?: SpecialEffectOptions) => {
    const { skipFirstRender } = options ?? {};

    const wasRenderedRef = useRef<boolean>(false);

    useEffect(() => {
        const wasRendered = wasRenderedRef.current;
        wasRenderedRef.current = true;

        if (skipFirstRender && !wasRendered) {
            return;
        }

        effect();
    }, deps);
};

export default useSpecialEffect;
