import { RouteProps } from 'react-router';
import RootPage from '../pages/RootPage';
import { values } from 'lodash';

export type AppRoute = RouteProps;

interface AppRoutesMap {
    readonly root: AppRoute;
}

export const routes: AppRoutesMap = {
    root: {
        path: '/',
        element: <RootPage />
    }
};

export const routesList: AppRoute[] = values(routes);
