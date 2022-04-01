import React, { FunctionComponent } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import styles from './AppLayout.module.scss';
import AppHeader from './components/appHeader/AppHeader';
import AppSider from './components/appSider/AppSider';
import AppFooter from './components/appFooter/AppFooter';

const AppLayout: FunctionComponent = ({ children }) => {
    return (
        <Layout className={styles.container}>
            <AppHeader />
            <Layout className={styles.mainLayout}>
                <AppSider />
                <Content className={styles.contentContainer}>{children}</Content>
            </Layout>
            <AppFooter />
        </Layout>
    );
};

export default AppLayout;
