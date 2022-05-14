import useRouteContext from './useRouteContext';
import { DependencyList, useEffect } from 'react';
import { RouteContextType } from '../context/RouteContext';

declare const UNDEFINED_VOID_ONLY: unique symbol;
type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };
type RouteContextEffectCallback = (setState: RouteContextType['state'][1]) => void | Destructor;

const useRouteContextEffect = (effect: RouteContextEffectCallback, deps: DependencyList) => {
    const {
        state: [, setState],
        meta: [meta]
    } = useRouteContext();

    useEffect(() => {
        if (meta.isInitialized) {
            effect(setState);
        }
    }, [...deps, meta]);
};

export default useRouteContextEffect;
