import React, { FC } from 'react';
import { ROUTER_TYPE } from '../constants/env';
import { BrowserRouter, HashRouter } from 'react-router-dom';

const routers = {
    HashRouter,
    BrowserRouter
} as const;

interface Props {
    basename?: string;
    children?: React.ReactNode;
    window?: Window;
}

const OptionalRouter: FC<Props> = (props) => {
    const Router = routers[ROUTER_TYPE];

    return <Router {...props} />;
};

export default OptionalRouter;
