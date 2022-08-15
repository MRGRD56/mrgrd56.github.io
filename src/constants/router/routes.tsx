import { RouteProps } from 'react-router';
import { values } from 'lodash';
import React, { ComponentType } from 'react';

const RootPage = React.lazy(() => import('../../pages/rootPage/RootPage'));
const GithubPagesListPage = React.lazy(() => import('../../pages/githubPagesPage/GithubPagesListPage'));
const LongContentPage = React.lazy(() => import('../../pages/longContentPage/LongContentPage'));
const JsonStringifierPage = React.lazy(() => import('../../pages/jsonStringifierPage/JsonStringifierPage'));
const TemplateTextGeneratorPage = React.lazy(
    () => import('../../pages/templateTextGenerator/TemplateTextGeneratorPage')
);
const QrScannerPage = React.lazy(() => import('../../pages/qrScannerPage/QrScannerPage'));
const BgGeneratorPage = React.lazy(() => import('../../pages/bgGeneratorPage/BgGeneratorPage'));
const JsEvaluatorPage = React.lazy(() => import('../../pages/jsEvaluatorPage/JsEvaluatorPage'));
const UserInfoPage = React.lazy(() => import('../../pages/userInfoPage/UserInfoPage'));
const NotFoundPage = React.lazy(() => import('../../pages/notFoundPage/NotFoundPage'));
const UnitConverterPage = React.lazy(() => import('../../pages/unitConverterPage/UnitConverterPage'));
const SnakeGamePage = React.lazy(() => import('../../pages/snakeGamePage/SnakeGamePage'));
const UuidGeneratorPage = React.lazy(() => import('../../pages/uuidGeneratorPage/UuidGeneratorPage'));
const QrGeneratorPage = React.lazy(() => import('../../pages/qrGeneratorPage/QrGeneratorPage'));
const SettingsPage = React.lazy(() => import('../../pages/settingsPage/SettingsPage'));
const AboutPage = React.lazy(() => import('../../pages/aboutPage/AboutPage'));
const CodeFormatterPage = React.lazy(() => import('../../pages/codeFormatterPage/CodeFormatterPage'));
const DiffEditorPage = React.lazy(() => import('../../pages/diffEditorPage/DiffEditorPage'));
const JsonToTypeScriptPage = React.lazy(() => import('../../pages/jsonToTypeScriptPage/JsonToTypeScriptPage'));
const NotificationsTestPage = React.lazy(() => import('../../pages/notificationsTestPage/NotificationsTestPage'));
const DateUtilsPage = React.lazy(() => import('../../pages/dateUtilsPage/DateUtilsPage'));
const ImageCompressorPage = React.lazy(() => import('../../pages/imageCompressorPage/ImageCompressorPage'));
const HtmlEditorPage = React.lazy(() => import('../../pages/htmlEditorPage/HtmlEditorPage'));
const Base64Page = React.lazy(() => import('../../pages/base64Page/Base64Page'));
const DataUrlPage = React.lazy(() => import('../../pages/dataUrlPage/DataUrlPage'));
const DataUrlViewPage = React.lazy(() => import('../../pages/dataUrlViewPage/DataUrlViewPage'));
const RouteContextInitializer = React.lazy(() => import('../../layouts/RouteContextInitializer'));
const JsonToYamlPage = React.lazy(() => import('../../pages/jsonToYamlPage/JsonToYamlPage'));
const CounterPage = React.lazy(() => import('../../pages/counterPage/CounterPage'));
const RooksDemoPage = React.lazy(() => import('../../pages/rooksDemoPage/RooksDemoPage'));
const MarkdownCheatSheetPage = React.lazy(() => import('../../pages/markdownCheatSheetPage/MarkdownCheatSheetPage'));
const JsEventTesterPage = React.lazy(() => import('../../pages/jsEventTesterPage/JsEventTesterPage'));
const DataUrlViewerPage = React.lazy(() => import('../../pages/dataUrlViewerPage/DataUrlViewerPage'));
const ClockPage = React.lazy(() => import('../../pages/clockPage/ClockPage'));
const PasswordGeneratorPage = React.lazy(() => import('../../pages/passwordGeneratorPage/PasswordGeneratorPage'));
const UrlEncoderPage = React.lazy(() => import('../../pages/urlEncoderPage/UrlEncoderPage'));
const LayoutSwitcherPage = React.lazy(() => import('../../pages/layoutSwitcherPage/LayoutSwitcherPage'));
const HtmlEntitiesConverterPage = React.lazy(
    () => import('../../pages/htmlEntitiesConverterPage/HtmlEntitiesConverterPage')
);
const PrettyBytesPage = React.lazy(() => import('../../pages/prettyBytesPage/PrettyBytesPage'));
const HhDictionariesPage = React.lazy(() => import('../../pages/hhDictionariesPage/HhDictionariesPage'));

/*
 * import (.*) from ('.*');
 * const $1 = React.lazy(() => import($2));
 */

export interface AppRoute extends Omit<RouteProps, 'element'> {
    path: string;
    component: ComponentType;
    title: string;
    isLayoutHidden?: boolean;
    isFooterAlwaysShown?: boolean;
}

type AppRoutesMap = Readonly<{
    root: AppRoute;
    settings: AppRoute;
    about: AppRoute;
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
    jsonToTypescript: AppRoute;
    notificationsTest: AppRoute;
    dateUtils: AppRoute;
    jsonToYaml: AppRoute;
    imageCompressor: AppRoute;
    htmlEditor: AppRoute;
    base64: AppRoute;
    dataUrl: AppRoute;
    dataUrlView: AppRoute;
    dataUrlViewer: AppRoute;
    counter: AppRoute;
    rooksDemo: AppRoute;
    jsEventTester: AppRoute;
    markdownCheatSheet: AppRoute;
    clock: AppRoute;
    passwordGenerator: AppRoute;
    urlEncoder: AppRoute;
    layoutSwitcher: AppRoute;
    htmlEntities: AppRoute;
    prettyBytes: AppRoute;
    hhDictionaries: AppRoute;
}>;

export const routes: AppRoutesMap = {
    root: {
        path: '/',
        component: RootPage,
        title: 'MRGRD56',
        isFooterAlwaysShown: true
    },
    settings: {
        path: '/settings',
        component: SettingsPage,
        title: 'Settings'
    },
    about: {
        path: '/about',
        component: AboutPage,
        title: 'About',
        isFooterAlwaysShown: true
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
    jsonToTypescript: {
        path: '/tools/json-to-typescript',
        component: JsonToTypeScriptPage,
        title: 'JSON to TypeScript'
    },
    notificationsTest: {
        path: '/tools/notifications-test',
        component: NotificationsTestPage,
        title: 'Notifications Test'
    },
    dateUtils: {
        path: '/tools/date-utils',
        component: DateUtilsPage,
        title: 'Date Utils'
    },
    jsonToYaml: {
        path: '/tools/json-to-yaml',
        component: JsonToYamlPage,
        title: 'JSON to YAML'
    },
    imageCompressor: {
        path: '/tools/image-compressor',
        component: ImageCompressorPage,
        title: 'Image Compressor'
    },
    htmlEditor: {
        path: '/tools/html-editor',
        component: HtmlEditorPage,
        title: 'HTML Editor'
    },
    base64: {
        path: '/tools/base64',
        component: Base64Page,
        title: 'Base64 encoder & decoder'
    },
    dataUrl: {
        path: '/tools/data-url',
        component: DataUrlPage,
        title: 'Data URL Generator'
    },
    dataUrlView: {
        path: '/tools/data-url/view',
        component: DataUrlViewPage,
        title: 'Content View',
        isLayoutHidden: true
    },
    dataUrlViewer: {
        path: '/tools/data-url-viewer',
        component: DataUrlViewerPage,
        title: 'Data URL Viewer'
    },
    counter: {
        path: '/tools/counter',
        component: CounterPage,
        title: 'Counter'
    },
    jsEventTester: {
        path: '/tools/js-event-tester',
        component: JsEventTesterPage,
        title: 'JS Event Tester'
    },
    rooksDemo: {
        path: '/other/rooks-demo',
        component: RooksDemoPage,
        title: 'Rooks Demo'
    },
    markdownCheatSheet: {
        path: '/articles/markdown-cheat-sheet',
        component: MarkdownCheatSheetPage,
        title: 'Markdown Cheat Sheet'
    },
    clock: {
        path: '/tools/clock',
        component: ClockPage,
        title: 'Clock'
    },
    passwordGenerator: {
        path: '/tools/password-generator',
        component: PasswordGeneratorPage,
        title: 'Password Generator'
    },
    urlEncoder: {
        path: '/tools/url-encoder',
        component: UrlEncoderPage,
        title: 'URL encoder & decoder'
    },
    layoutSwitcher: {
        path: '/tools/layout-switcher',
        component: LayoutSwitcherPage,
        title: 'Keyboard Layout Switcher'
    },
    htmlEntities: {
        path: '/tools/html-entities',
        component: HtmlEntitiesConverterPage,
        title: 'HTML Entities Converter'
    },
    prettyBytes: {
        path: '/tools/pretty-bytes',
        component: PrettyBytesPage,
        title: 'Human Readable Bytes'
    },
    hhDictionaries: {
        path: '/tools/headhunter-dictionaries',
        component: HhDictionariesPage,
        title: 'HeadHunter Dictionaries Viewer'
    }
};

export const convertAppRoute = ({ component: Component, title, ...route }: AppRoute): RouteProps => ({
    ...route,
    element: (
        <RouteContextInitializer title={title} key={route.path}>
            <Component />
        </RouteContextInitializer>
    )
});

export const appRoutesList: AppRoute[] = values(routes);

export const routesList: RouteProps[] = appRoutesList.map(convertAppRoute);
