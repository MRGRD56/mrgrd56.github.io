import React, { FunctionComponent, useEffect } from 'react';
import { useRouteContextState } from '../hooks/useRouteContext';

const RouteContextConsumer: FunctionComponent = ({ children }) => {
    const [routeContext] = useRouteContextState();

    const { title } = routeContext;

    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);

    return <>{children}</>;
};

export default RouteContextConsumer;
