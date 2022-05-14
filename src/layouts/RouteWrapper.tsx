import React, { FunctionComponent, useState } from 'react';
import RouteContext, { RouteContextType } from '../context/RouteContext';
import RouteContextConsumer from './RouteContextConsumer';

const RouteWrapper: FunctionComponent<RouteContextType> = ({ children, ...contextValue }) => {
    const contextState = useState(contextValue);

    return (
        <RouteContext.Provider value={contextState}>
            <RouteContextConsumer>{children}</RouteContextConsumer>
        </RouteContext.Provider>
    );
};

export default RouteWrapper;
