import React, { FunctionComponent } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import styles from './AppLayout.module.scss';
import AppHeader from './components/appHeader/AppHeader';
import AppSider from './components/appSider/AppSider';
import AppFooter from './components/appFooter/AppFooter';
import useAppSettings from '../../hooks/useAppSettings';
import useAppLocation from '../../hooks/useAppLocation';
import { routes } from '../../constants/router/routes';

const AppLayout: FunctionComponent = ({ children }) => {
    const { isFooterHidden } = useAppSettings();
    const appRoute = useAppLocation();

    const isFooterShown = !isFooterHidden || appRoute === routes.root;

    return (
        <Layout className={styles.container}>
            <AppHeader />
            <Layout className={styles.mainLayout}>
                <AppSider />
                <Content className={styles.contentContainer}>{children}</Content>
            </Layout>
            {isFooterShown && <AppFooter />}
        </Layout>
    );
};

export default AppLayout;
