import React, { FunctionComponent, useMemo } from 'react';
import { Menu } from 'antd';
import styles from './AppMenu.module.scss';
import { renderMenuItems } from '../../utils/routeMenuItems';
import menuItems from '../../../../constants/router/menuItems';
import { useLocation } from 'react-router-dom';
import useAppSettings from '../../../../hooks/useAppSettings';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import classNames from 'classnames';

interface Props {
    onItemSelect?: () => void;
}

const AppMenu: FunctionComponent<Props> = ({ onItemSelect }) => {
    const { pathname } = useLocation();
    const appSettings = useAppSettings();

    const renderedMenuItems = useMemo<ItemType[]>(() => {
        return renderMenuItems(menuItems, appSettings);
    }, [appSettings]);

    return (
        <Menu
            mode="inline"
            className={classNames(styles.menu, 'AppMenu')}
            activeKey={pathname}
            selectedKeys={[pathname]}
            onSelect={onItemSelect}
            items={renderedMenuItems}
        />
    );
};

export default AppMenu;
