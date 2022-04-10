import { isSubMenuItem, MenuItem, MenuRouteItem } from '../../layouts/appLayout/utils/routeMenuItems';
import { BookFilled, DeleteFilled, GithubFilled, HomeFilled, StarFilled, ToolFilled } from '@ant-design/icons';
import { routes } from './routes';

const menuItems: MenuItem[] = [
    {
        title: 'Home page',
        icon: HomeFilled,
        route: routes.root
    },
    {
        title: 'GitHub Pages',
        icon: GithubFilled,
        route: routes.githubPagesList
    },
    {
        title: 'Tools',
        icon: ToolFilled,
        routes: [
            {
                title: 'JSON Stringifier',
                route: routes.jsonStringifier
            },
            {
                title: 'Text by Template Generator',
                route: routes.templateTextGenerator,
                isGray: true
            },
            {
                title: 'QR Scanner',
                route: routes.qrScanner
            },
            {
                title: 'BG Generator',
                route: routes.bgGenerator
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
                title: 'Long Content Test',
                icon: DeleteFilled,
                route: routes.longContent
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
