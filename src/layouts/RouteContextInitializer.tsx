import React, { FunctionComponent } from 'react';
import { RouteContextState } from '../context/RouteContext';
import useRouteContext from '../hooks/useRouteContext';
import { useDidMount } from 'rooks';

interface Props extends RouteContextState {}

const RouteContextInitializer: FunctionComponent<Props> = ({ children, ...contextValue }) => {
    const {
        state: [, setState],
        meta: [, setMeta]
    } = useRouteContext();

    useDidMount(() => {
        setState(contextValue);
        setMeta((meta) => ({
            ...meta,
            isInitialized: true
        }));
    });

    return <>{children}</>;
};

export default RouteContextInitializer;
