import React from 'react';
import Sider from 'antd/lib/layout/Sider';
import AppMenu from '../appMenu/AppMenu';
import styles from './AppSider.module.scss';
import classNames from 'classnames';

const AppSider = () => {
    return (
        <Sider theme="light" className={classNames(styles.container, 'AppSider')} trigger={null}>
            <AppMenu />
        </Sider>
    );
};

export default AppSider;
