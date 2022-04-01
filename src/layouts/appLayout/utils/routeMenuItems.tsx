import { AppRoute } from '../../../constants/router/routes';
import React, { ComponentType, ReactNode } from 'react';
import { Menu } from 'antd';
import renderComponent from '../../../utils/renderComponent';
import { Link } from 'react-router-dom';
import { isArray } from 'lodash';
import SubMenu from 'antd/lib/menu/SubMenu';

export const renderRoute = (route: AppRoute, title: string, icon?: ComponentType): ReactNode => {
    const { path } = route;

    return (
        <Menu.Item icon={renderComponent(icon)} key={path}>
            <Link to={path ?? ''}>{title}</Link>
        </Menu.Item>
    );
};

interface MenuItemBase {
    title: string;
    icon?: ComponentType;
}

interface MenuRouteItem extends MenuItemBase {
    route: AppRoute;
}

interface SubMenuItem extends MenuItemBase {
    routes: MenuItem[];
}

export type MenuItem = MenuRouteItem | SubMenuItem;

const isSubMenuItem = (menuItem: MenuItem): menuItem is SubMenuItem => {
    return 'routes' in menuItem && isArray(menuItem.routes);
};

export const renderMenuItem = (menuItem: MenuItem): ReactNode => {
    if (isSubMenuItem(menuItem)) {
        return (
            <SubMenu icon={renderComponent(menuItem.icon)} title={menuItem.title}>
                {menuItem.routes.length ? (
                    menuItem.routes.map(renderMenuItem)
                ) : (
                    <Menu.Item disabled>Nothing for now</Menu.Item>
                )}
            </SubMenu>
        );
    }

    return renderRoute(menuItem.route, menuItem.title, menuItem.icon);
};

export const renderMenuItems = (menuItems: MenuItem[]) => <>{menuItems.map(renderMenuItem)}</>;
