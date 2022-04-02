import { RouteProps } from 'react-router';
import RootPage from '../../pages/RootPage';
import { values } from 'lodash';
import GithubPagesListPage from '../../pages/githubPagesPage/GithubPagesListPage';
import { ComponentType } from 'react';
import renderComponent from '../../utils/renderComponent';
import LongContentPage from '../../pages/longContentPage/LongContentPage';
import JsonStringifierPage from '../../pages/jsonStringifierPage/JsonStringifierPage';
import TemplateTextGeneratorPage from '../../pages/templateTextGenerator/TemplateTextGeneratorPage';

export interface AppRoute extends Omit<RouteProps, 'element'> {
    path: string;
    component: ComponentType;
}

type AppRoutesMap = Readonly<{
    root: AppRoute;
    githubPagesList: AppRoute;
    longContent: AppRoute;
    jsonStringifier: AppRoute;
    templateTextGenerator: AppRoute;
}>;

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
    },
    jsonStringifier: {
        path: '/tools/json-stringifier',
        component: JsonStringifierPage
    },
    templateTextGenerator: {
        path: '/tools/template-text-generator',
        component: TemplateTextGeneratorPage
    }
};

export const routesList: RouteProps[] = values(routes).map(({ component, ...route }) => ({
    ...route,
    element: renderComponent(component)
}));
