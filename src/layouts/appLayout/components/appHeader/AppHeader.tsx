import React from 'react';
import { Header } from 'antd/lib/layout/layout';
import styles from './AppHeader.module.scss';
import Text from 'antd/lib/typography/Text';
import { Menu } from 'antd';

const AppHeader = () => {
    return (
        <Header className={styles.container}>
            <div className={styles.logo}>
                <Text strong className={styles.logoText}>
                    MRGRD56
                </Text>
            </div>
            <Menu theme="dark"></Menu>
        </Header>
    );
};

export default AppHeader;
