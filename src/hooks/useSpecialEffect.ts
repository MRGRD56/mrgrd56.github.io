import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export interface SpecialEffectOptions {
    skipFirstRender?: boolean;
}

interface SpecialEffectData {
    isFirstRender: boolean;
}

type SpecialEffectCallback = (data: SpecialEffectData) => ReturnType<EffectCallback>;

const useSpecialEffect = (effect: SpecialEffectCallback, deps: DependencyList, options?: SpecialEffectOptions) => {
    const { skipFirstRender } = options ?? {};

    const wasRenderedRef = useRef<boolean>(false);

    useEffect(() => {
        const wasRendered = wasRenderedRef.current;
        wasRenderedRef.current = true;

        if (skipFirstRender && !wasRendered) {
            return;
        }

        effect({
            isFirstRender: !wasRendered
        });
    }, deps);
};

export default useSpecialEffect;
