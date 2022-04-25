import React from 'react';
import Sider from 'antd/lib/layout/Sider';
import AppMenu from '../appMenu/AppMenu';
import styles from './AppSider.module.scss';

const AppSider = () => {
    return (
        <Sider theme="light" className={styles.container} trigger={null}>
            <AppMenu />
        </Sider>
    );
};

export default AppSider;
