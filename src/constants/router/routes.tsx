import { RouteProps } from 'react-router';
import RootPage from '../../pages/rootPage/RootPage';
import { values } from 'lodash';
import GithubPagesListPage from '../../pages/githubPagesPage/GithubPagesListPage';
import { ComponentType } from 'react';
import renderComponent from '../../utils/renderComponent';
import LongContentPage from '../../pages/longContentPage/LongContentPage';
import JsonStringifierPage from '../../pages/jsonStringifierPage/JsonStringifierPage';
import TemplateTextGeneratorPage from '../../pages/templateTextGenerator/TemplateTextGeneratorPage';
import QrScannerPage from '../../pages/qrScannerPage/QrScannerPage';
import BgGeneratorPage from '../../pages/bgGeneratorPage/BgGeneratorPage';
import StringUtilsPage from '../../pages/stringUtilsPage/StringUtilsPage';
import UserInfoPage from '../../pages/userInfoPage/UserInfoPage';

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
    qrScanner: AppRoute;
    bgGenerator: AppRoute;
    stringUtils: AppRoute;
    userInfo: AppRoute;
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
    },
    qrScanner: {
        path: '/tools/qr-scanner',
        component: QrScannerPage
    },
    bgGenerator: {
        path: '/tools/bg-generator',
        component: BgGeneratorPage
    },
    stringUtils: {
        path: '/tools/string-utils',
        component: StringUtilsPage
    },
    userInfo: {
        path: '/tools/user-info',
        component: UserInfoPage
    }
};

export const routesList: RouteProps[] = values(routes).map(({ component, ...route }) => ({
    ...route,
    element: renderComponent(component)
}));
