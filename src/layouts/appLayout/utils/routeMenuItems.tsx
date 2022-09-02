import { AppRoute } from '../../../constants/router/routes';
import React, { ComponentType, ReactNode } from 'react';
import renderComponent from '../../../utils/renderComponent';
import { isArray, isObject, isString } from 'lodash';
import classNames from 'classnames';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import AppSettings from '../../../types/AppSettings';
import RouterLink, { RouterLinkType } from '../../../components/RouterLink';

/** @deprecated */
export const getMenuItemLink = (item: SingleMenuItem): string => {
    return isRouteMenuItem(item) ? item.route.path : item.url;
};

export const getMenuItemTitle = (item: SingleMenuItem): string => {
    return isRouteMenuItem(item) ? item.title ?? item.route.title : item.title;
};

export const getMenuItemRouterLink = (item: SingleMenuItem): RouterLinkType => {
    return isRouteMenuItem(item)
        ? {
              isExternal: false,
              link: item.route.path
          }
        : {
              isExternal: true,
              link: item.url
          };
};

export const renderRoute = (item: SingleMenuItem): ItemType => {
    const { icon, isHidden } = item;

    const routerLink = getMenuItemRouterLink(item);
    const title = getMenuItemTitle(item);

    return {
        key: routerLink.link,
        icon: renderComponent(icon),
        label: (
            <RouterLink to={routerLink} className={classNames({ 'opacity-50': isHidden })} title={title}>
                {title}
            </RouterLink>
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

interface SingleMenuItemBase extends MenuItemBase {
    title?: string;
    searchText?: string;
    isHidden?: boolean;
    description?: string;
    largeIcon?: ReactNode;
}

export interface RouteMenuItem extends SingleMenuItemBase {
    route: AppRoute;
}

export interface LinkMenuItem extends SingleMenuItemBase {
    url: string;
    title: string;
}

export type SingleMenuItem = RouteMenuItem | LinkMenuItem;

export interface ParentMenuItem extends MenuItemBase {
    title: string;
    items: MenuItem[];
}

export type MenuItem = RouteMenuItem | LinkMenuItem | ParentMenuItem;

export const isRouteMenuItem = (item: MenuItem): item is RouteMenuItem => 'route' in item && isObject(item.route);
export const isLinkMenuItem = (item: MenuItem): item is LinkMenuItem => 'url' in item && isString(item.url);
export const isSingleMenuItem = (item: MenuItem): item is SingleMenuItem =>
    isRouteMenuItem(item) || isLinkMenuItem(item);
export const isParentMenuItem = (item: MenuItem): item is ParentMenuItem => 'items' in item && isArray(item.items);

export const isSubMenuItem = (menuItem: MenuItem): menuItem is ParentMenuItem => {
    return 'items' in menuItem && isArray(menuItem.items);
};

export const renderMenuItem = (menuItem: MenuItem, index: number, settings: AppSettings): ItemType => {
    if (isSubMenuItem(menuItem)) {
        return {
            key: index,
            icon: renderComponent(menuItem.icon),
            label: menuItem.title,
            children: menuItem.items.length
                ? menuItem.items
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
