import { AppRoute } from '../../../constants/router/routes';
import React, { ComponentType, ReactNode } from 'react';
import { Menu } from 'antd';
import renderComponent from '../../../utils/renderComponent';
import { Link } from 'react-router-dom';
import { isArray } from 'lodash';
import SubMenu from 'antd/lib/menu/SubMenu';
import classNames from 'classnames';

export const renderRoute = ({ route, title, icon, isGray }: MenuRouteItem): ReactNode => {
    const { path } = route;

    return (
        <Menu.Item icon={renderComponent(icon)} key={path}>
            <Link to={path ?? ''} className={classNames({ 'text-black-50': isGray })}>
                {title ?? route.title}
            </Link>
        </Menu.Item>
    );
};

interface MenuItemBase {
    icon?: ComponentType;
}

export interface MenuRouteItem extends MenuItemBase {
    title?: string;
    route: AppRoute;
    isGray?: boolean;
}

export interface SubMenuItem extends MenuItemBase {
    title: string;
    routes: MenuItem[];
}

export type MenuItem = MenuRouteItem | SubMenuItem;

export const isSubMenuItem = (menuItem: MenuItem): menuItem is SubMenuItem => {
    return 'routes' in menuItem && isArray(menuItem.routes);
};

export const renderMenuItem = (menuItem: MenuItem, index: number): ReactNode => {
    if (isSubMenuItem(menuItem)) {
        return (
            <SubMenu key={index} icon={renderComponent(menuItem.icon)} title={menuItem.title}>
                {menuItem.routes.length ? (
                    menuItem.routes.map(renderMenuItem)
                ) : (
                    <Menu.Item disabled>Nothing for now</Menu.Item>
                )}
            </SubMenu>
        );
    }

    return renderRoute(menuItem);
};

export const renderMenuItems = (menuItems: MenuItem[]) => <>{menuItems.map(renderMenuItem)}</>;
