import { DependencyList, RefObject, useCallback, useEffect, useRef } from 'react';

/** @deprecated use rooks hook instead */
const useMutationObserver = (
    elementRef: RefObject<Node>,
    callback: MutationCallback,
    deps: DependencyList,
    options: MutationObserverInit = {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true
    }
) => {
    const observerRef = useRef<MutationObserver>();

    const memoizedCallback = useCallback(callback, deps);

    useEffect(() => {
        const { current } = elementRef;

        if (!current) {
            return;
        }

        observerRef.current = new MutationObserver((mutations, observer1) => {
            memoizedCallback(mutations, observer1);
        });
        observerRef.current.observe(current, options);

        return () => {
            observerRef.current?.disconnect();
        };
    }, [memoizedCallback, options]);
};

export default useMutationObserver;
