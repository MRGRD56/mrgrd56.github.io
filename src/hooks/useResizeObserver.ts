import { useEffect } from 'react';
import useAutoRef from './useAutoRef';

const useResizeObserver = (element: Element | null, callback: ResizeObserverCallback) => {
    const elementRef = useAutoRef<Element | null>(element);
    const callbackRef = useAutoRef<ResizeObserverCallback>(callback);

    useEffect(() => {
        if (!elementRef.current) {
            return;
        }

        const resizeObserver = new ResizeObserver(callbackRef.current);
        resizeObserver.observe(elementRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);
};

export default useResizeObserver;
