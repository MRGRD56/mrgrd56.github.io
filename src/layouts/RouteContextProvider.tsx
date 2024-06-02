import React, { FunctionComponent, useMemo, useState } from 'react';
import RouteContext, { RouteContextMeta, RouteContextState, RouteContextType } from '../context/RouteContext';

const initialContextState: RouteContextState = {
    title: 'KIRIRU.SU'
};

const initialContextMeta: RouteContextMeta = {
    isInitialized: false
};

const RouteContextProvider: FunctionComponent = ({ children }) => {
    const contextState = useState<RouteContextState>(initialContextState);
    const contextMeta = useState<RouteContextMeta>(initialContextMeta);

    const contextValue = useMemo<RouteContextType>(() => {
        return {
            state: contextState,
            meta: contextMeta
        };
    }, [contextState, contextMeta]);

    return <RouteContext.Provider value={contextValue}>{children}</RouteContext.Provider>;
};

export default RouteContextProvider;
