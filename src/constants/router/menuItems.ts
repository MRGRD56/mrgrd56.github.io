import { isSubMenuItem, MenuItem, MenuRouteItem } from '../../layouts/appLayout/utils/routeMenuItems';
import {
    BookFilled,
    DeleteFilled,
    ExclamationCircleFilled,
    GithubFilled,
    HomeFilled,
    PlayCircleFilled,
    QuestionCircleFilled,
    SettingFilled,
    StarFilled,
    ToolFilled
} from '@ant-design/icons';
import { routes } from './routes';

const menuItems: MenuItem[] = [
    {
        route: routes.root,
        icon: HomeFilled,
        title: 'Home page'
    },
    {
        route: routes.githubPagesList,
        icon: GithubFilled
    },
    {
        title: 'Tools',
        icon: ToolFilled,
        routes: [
            {
                route: routes.jsonToTypescript
            },
            {
                route: routes.jsEvaluator
            },
            {
                route: routes.diffEditor
            },
            {
                route: routes.codeFormatter
            },
            {
                route: routes.uuidGenerator
            },
            {
                route: routes.jsonStringifier
            },
            {
                route: routes.qrScanner
            },
            {
                route: routes.qrGenerator
            },
            {
                route: routes.bgGenerator,
                title: 'BG Generator'
            },
            {
                route: routes.userInfo
            },
            {
                route: routes.notificationsTest
            },
            {
                route: routes.htmlEditor
            },
            {
                route: routes.dataUrl
            },
            {
                route: routes.base64,
                isHidden: true
            },
            {
                route: routes.imageCompressor,
                isHidden: true
            },
            {
                route: routes.dateUtils,
                isHidden: true
            },
            {
                route: routes.templateTextGenerator,
                isHidden: true
            },
            {
                route: routes.unitConverter,
                isHidden: true
            }
        ]
    },
    {
        title: 'Games',
        icon: PlayCircleFilled,
        routes: [
            {
                route: routes.snakeGame,
                title: 'Snake'
            }
        ]
    },
    {
        title: 'Articles',
        icon: BookFilled,
        routes: []
    },
    {
        title: 'Other',
        icon: StarFilled,
        routes: [
            {
                route: routes.longContent,
                icon: DeleteFilled
            },
            {
                route: routes.notFound,
                icon: QuestionCircleFilled
            }
        ]
    },
    {
        route: routes.settings,
        icon: SettingFilled
    },
    {
        route: routes.about,
        icon: ExclamationCircleFilled
    }
];

export default menuItems;

const getMenuItemRouteItems = (menuItem: MenuItem): MenuRouteItem[] => {
    if (isSubMenuItem(menuItem)) {
        return menuItem.routes.flatMap(getMenuItemRouteItems);
    }

    return [menuItem];
};

export const menuRouteItems: MenuRouteItem[] = menuItems.flatMap(getMenuItemRouteItems);
