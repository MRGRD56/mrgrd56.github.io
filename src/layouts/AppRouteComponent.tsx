import React, { FunctionComponent, useMemo } from 'react';
import { Route } from 'react-router-dom';
import { AppRoute, convertAppRoute } from '../constants/router/routes';

interface Props {
    route: AppRoute;
}

/** @deprecated */
const AppRouteComponent: FunctionComponent<Props> = ({ route: appRoute }) => {
    const route = useMemo(() => convertAppRoute(appRoute), [appRoute]);

    return <Route {...route} />;
};

export default AppRouteComponent;
