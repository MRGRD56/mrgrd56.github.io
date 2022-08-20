import { AppRoute } from '../../../constants/router/routes';
import React, { ComponentType, ReactNode } from 'react';
import renderComponent from '../../../utils/renderComponent';
import { Link } from 'react-router-dom';
import { isArray } from 'lodash';
import classNames from 'classnames';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import AppSettings from '../../../types/AppSettings';

export const renderRoute = ({ route, title, icon, isHidden }: RouteMenuItem): ItemType => {
    const { path } = route;
    const routeTitle = title ?? route.title;

    return {
        key: path,
        icon: renderComponent(icon),
        label: (
            <Link to={path ?? ''} className={classNames({ 'opacity-50': isHidden })} title={routeTitle}>
                {routeTitle}
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

export interface RouteMenuItem extends MenuItemBase {
    title?: string;
    searchText?: string;
    route: AppRoute;
    isHidden?: boolean;
    description?: string;
    largeIcon?: ReactNode;
}

export interface ParentMenuItem extends MenuItemBase {
    title: string;
    routes: MenuItem[];
}

export type MenuItem = RouteMenuItem | ParentMenuItem;

export const isSubMenuItem = (menuItem: MenuItem): menuItem is ParentMenuItem => {
    return 'routes' in menuItem && isArray(menuItem.routes);
};

export const renderMenuItem = (menuItem: MenuItem, index: number, settings: AppSettings): ItemType => {
    if (isSubMenuItem(menuItem)) {
        return {
            key: index,
            icon: renderComponent(menuItem.icon),
            label: menuItem.title,
            children: menuItem.routes.length
                ? menuItem.routes
                      .filter((item) => {
                          if (settings.doShowHiddenMenuItems) {
                              return true;
                          }

                          return !('route' in item) || !item.isHidden;
                      })
                      .map((item, index) => renderMenuItem(item, index, settings))
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

export const renderMenuItems = (menuItems: MenuItem[], settings: AppSettings) =>
    menuItems.map((item, index) => renderMenuItem(item, index, settings));
