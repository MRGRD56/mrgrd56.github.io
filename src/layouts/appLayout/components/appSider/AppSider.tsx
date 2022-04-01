import React from 'react';
import { Menu } from 'antd';
import styles from './AppSider.module.scss';
import Sider from 'antd/lib/layout/Sider';
import { MenuItem, renderMenuItems } from '../../utils/routeMenuItems';
import { BookFilled, DeleteFilled, GithubFilled, HomeFilled, StarFilled, ToolFilled } from '@ant-design/icons';
import { routes } from '../../../../constants/routes';
import { useLocation } from 'react-router-dom';

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
        routes: []
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

const renderedMenuItems = renderMenuItems(menuItems);

const AppSider = () => {
    const { pathname } = useLocation();

    return (
        <Sider theme="light">
            <Menu mode="inline" className={styles.menu} activeKey={pathname} selectedKeys={[pathname]}>
                {renderedMenuItems}
            </Menu>
        </Sider>
    );
};

export default AppSider;
