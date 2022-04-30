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
import JsEvaluatorPage from '../../pages/jsEvaluatorPage/JsEvaluatorPage';
import UserInfoPage from '../../pages/userInfoPage/UserInfoPage';
import RouteWrapper from '../../layouts/RouteWrapper';
import NotFoundPage from '../../pages/notFoundPage/NotFoundPage';
import UnitConverterPage from '../../pages/unitConverterPage/UnitConverterPage';
import SnakeGamePage from '../../pages/snakeGamePage/SnakeGamePage';
import UuidGeneratorPage from '../../pages/uuidGeneratorPage/UuidGeneratorPage';
import QrGeneratorPage from '../../pages/qrGeneratorPage/QrGeneratorPage';
import SettingsPage from '../../pages/settingsPage/SettingsPage';
import AboutPage from '../../pages/aboutPage/AboutPage';
import CodeFormatterPage from '../../pages/codeFormatterPage/CodeFormatterPage';
import DiffEditorPage from '../../pages/DiffEditorPage';

export interface AppRoute extends Omit<RouteProps, 'element'> {
    path: string;
    component: ComponentType;
    title: string;
}

type AppRoutesMap = Readonly<{
    root: AppRoute;
    githubPagesList: AppRoute;
    longContent: AppRoute;
    jsonStringifier: AppRoute;
    templateTextGenerator: AppRoute;
    qrScanner: AppRoute;
    qrGenerator: AppRoute;
    bgGenerator: AppRoute;
    jsEvaluator: AppRoute;
    userInfo: AppRoute;
    notFound: AppRoute;
    unitConverter: AppRoute;
    snakeGame: AppRoute;
    uuidGenerator: AppRoute;
    diffEditor: AppRoute;
    codeFormatter: AppRoute;
    settings: AppRoute;
    about: AppRoute;
}>;

export const routes: AppRoutesMap = {
    root: {
        path: '/',
        component: RootPage,
        title: 'MRGRD56'
    },
    githubPagesList: {
        path: '/github-pages',
        component: GithubPagesListPage,
        title: 'GitHub Pages'
    },
    longContent: {
        path: '/other/long-content',
        component: LongContentPage,
        title: 'Long Content Test'
    },
    jsonStringifier: {
        path: '/tools/json-stringifier',
        component: JsonStringifierPage,
        title: 'JSON Stringifier'
    },
    templateTextGenerator: {
        path: '/tools/template-text-generator',
        component: TemplateTextGeneratorPage,
        title: 'Text by Template Generator'
    },
    qrScanner: {
        path: '/tools/qr-scanner',
        component: QrScannerPage,
        title: 'QR Scanner'
    },
    qrGenerator: {
        path: '/tools/qr-generator',
        component: QrGeneratorPage,
        title: 'QR Generator'
    },
    bgGenerator: {
        path: '/tools/bg-generator',
        component: BgGeneratorPage,
        title: 'Background Generator'
    },
    jsEvaluator: {
        path: '/tools/javascript-eval',
        component: JsEvaluatorPage,
        title: 'JavaScript Evaluator'
    },
    userInfo: {
        path: '/tools/user-info',
        component: UserInfoPage,
        title: 'User Info'
    },
    notFound: {
        path: '/other/not-found',
        component: NotFoundPage,
        title: 'Not Found'
    },
    unitConverter: {
        path: '/tools/unit-converter',
        component: UnitConverterPage,
        title: 'Unit Converter'
    },
    snakeGame: {
        path: '/games/snake',
        component: SnakeGamePage,
        title: 'Snake Game'
    },
    uuidGenerator: {
        path: '/tools/uuid-generator',
        component: UuidGeneratorPage,
        title: 'UUID Generator'
    },
    diffEditor: {
        path: '/tools/files-diff',
        component: DiffEditorPage,
        title: 'Diff Editor'
    },
    codeFormatter: {
        path: '/tools/code-formatter',
        component: CodeFormatterPage,
        title: 'Code Formatter'
    },
    settings: {
        path: '/settings',
        component: SettingsPage,
        title: 'Settings'
    },
    about: {
        path: '/about',
        component: AboutPage,
        title: 'About'
    }
};

export const convertAppRoute = ({ component, title, ...route }: AppRoute): RouteProps => ({
    ...route,
    element: <RouteWrapper title={title}>{renderComponent(component)}</RouteWrapper>
});

export const appRoutesList: AppRoute[] = values(routes);

export const routesList: RouteProps[] = appRoutesList.map(convertAppRoute);
