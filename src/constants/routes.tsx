import { RouteProps } from 'react-router';
import RootPage from '../pages/RootPage';
import { values } from 'lodash';
import GithubPagesListPage from '../pages/githubPagesPage/GithubPagesListPage';
import { ComponentType } from 'react';
import renderComponent from '../utils/renderComponent';
import LongContentPage from '../pages/longContentPage/LongContentPage';

export interface AppRoute extends Omit<RouteProps, 'element'> {
    component: ComponentType;
}

interface AppRoutesMap {
    readonly root: AppRoute;
    readonly githubPagesList: AppRoute;
    readonly longContent: AppRoute;
}

export const routes: AppRoutesMap = {
    root: {
        path: '/',
        component: RootPage
    },
    githubPagesList: {
        path: '/github-pages',
        component: GithubPagesListPage
    },
    longContent: {
        path: '/trash/long-content',
        component: LongContentPage
    }
};

export const routesList: RouteProps[] = values(routes).map(({ component, ...route }) => ({
    ...route,
    element: renderComponent(component)
}));
