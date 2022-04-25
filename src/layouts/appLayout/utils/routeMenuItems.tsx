import { AppRoute } from '../../../constants/router/routes';
import React, { ComponentType } from 'react';
import renderComponent from '../../../utils/renderComponent';
import { Link } from 'react-router-dom';
import { isArray } from 'lodash';
import classNames from 'classnames';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

export const renderRoute = ({ route, title, icon, isGray }: MenuRouteItem): ItemType => {
    const { path } = route;

    return {
        key: path,
        icon: renderComponent(icon),
        label: (
            <Link to={path ?? ''} className={classNames({ 'text-black-50': isGray })}>
                {title ?? route.title}
            </Link>
        )
    };

    // return (
    //     <Menu.Item icon={renderComponent(icon)} key={path}>
    //         <Link to={path ?? ''} className={classNames({ 'text-black-50': isGray })}>
    //             {title ?? route.title}
    //         </Link>
    //     </Menu.Item>
    // );
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

export const renderMenuItem = (menuItem: MenuItem, index: number): ItemType => {
    if (isSubMenuItem(menuItem)) {
        return {
            key: index,
            icon: renderComponent(menuItem.icon),
            label: menuItem.title,
            children: menuItem.routes.length
                ? menuItem.routes.map(renderMenuItem)
                : [
                      {
                          key: 'nothing',
                          disabled: true,
                          label: 'Nothing for now'
                      }
                  ]
        };
    }

    return renderRoute(menuItem);
};

export const renderMenuItems = (menuItems: MenuItem[]) => menuItems.map(renderMenuItem);
