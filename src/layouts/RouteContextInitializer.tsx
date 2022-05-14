import React, { FunctionComponent, useEffect } from 'react';
import { RouteContextState } from '../context/RouteContext';
import useRouteContext from '../hooks/useRouteContext';

const RouteContextInitializer: FunctionComponent<RouteContextState> = ({ children, ...contextValue }) => {
    const {
        state: [, setState],
        meta: [, setMeta]
    } = useRouteContext();

    useEffect(() => {
        setState(contextValue);
        setMeta((meta) => ({
            ...meta,
            isInitialized: true
        }));
    }, []);

    return <>{children}</>;
};

export default RouteContextInitializer;
