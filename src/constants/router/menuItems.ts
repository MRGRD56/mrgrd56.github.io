import { isSubMenuItem, MenuItem, MenuRouteItem } from '../../layouts/appLayout/utils/routeMenuItems';
import {
    BookFilled,
    DeleteFilled,
    GithubFilled,
    HomeFilled,
    PlayCircleFilled,
    QuestionCircleFilled,
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
                route: routes.jsonStringifier
            },
            {
                route: routes.templateTextGenerator,
                isGray: true
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
                route: routes.stringUtils
            },
            {
                route: routes.uuidGenerator
            },
            {
                route: routes.userInfo,
                isGray: true
            },
            {
                route: routes.unitConverter,
                isGray: true
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
