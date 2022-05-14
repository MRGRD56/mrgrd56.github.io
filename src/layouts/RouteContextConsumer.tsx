import React, { FunctionComponent, useEffect } from 'react';
import useRouteContext from '../hooks/useRouteContext';

const RouteContextConsumer: FunctionComponent = ({ children }) => {
    const [{ title }] = useRouteContext();

    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);

    return <>{children}</>;
};

export default RouteContextConsumer;
