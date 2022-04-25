import React, { FunctionComponent } from 'react';
import { Menu } from 'antd';
import styles from './AppMenu.module.scss';
import { renderMenuItems } from '../../utils/routeMenuItems';
import menuItems from '../../../../constants/router/menuItems';
import { useLocation } from 'react-router-dom';

const renderedMenuItems = renderMenuItems(menuItems);

interface Props {
    onItemSelect?: () => void;
}

const AppMenu: FunctionComponent<Props> = ({ onItemSelect }) => {
    const { pathname } = useLocation();

    return (
        <Menu
            mode="inline"
            className={styles.menu}
            activeKey={pathname}
            selectedKeys={[pathname]}
            onSelect={onItemSelect}
            items={renderedMenuItems}
        />
    );
};

export default AppMenu;
