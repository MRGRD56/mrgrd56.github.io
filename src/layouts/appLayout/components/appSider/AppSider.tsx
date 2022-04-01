import React from 'react';
import { Menu } from 'antd';
import styles from './AppSider.module.scss';
import Sider from 'antd/lib/layout/Sider';
import { renderMenuItems } from '../../utils/routeMenuItems';
import { useLocation } from 'react-router-dom';
import menuItems from '../../../../constants/router/menuItems';

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
