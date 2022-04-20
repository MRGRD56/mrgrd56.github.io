import { isSubMenuItem, MenuItem, MenuRouteItem } from '../../layouts/appLayout/utils/routeMenuItems';
import {
    BookFilled,
    DeleteFilled,
    GithubFilled,
    HomeFilled,
    QuestionCircleFilled,
    StarFilled,
    ToolFilled
} from '@ant-design/icons';
import { routes } from './routes';

const menuItems: MenuItem[] = [
    {
        route: routes.root,
        icon: HomeFilled
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
                route: routes.bgGenerator,
                title: 'BG Generator'
            },
            {
                route: routes.stringUtils
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