import React from 'react';
import { Header } from 'antd/lib/layout/layout';
import styles from './AppHeader.module.scss';
import Text from 'antd/lib/typography/Text';
import AppHeaderSearch from './components/appHeaderSearch/AppHeaderSearch';

const AppHeader = () => {
    return (
        <Header className={styles.container}>
            <div className={styles.logo}>
                <Text strong className={styles.logoText}>
                    MRGRD56
                </Text>
            </div>
            {/*<Menu theme="dark"></Menu>*/}
            <AppHeaderSearch />
        </Header>
    );
};

export default AppHeader;
