import React, { FunctionComponent } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import styles from './AppLayout.module.scss';
import AppHeader from './components/appHeader/AppHeader';
import AppSider from './components/appSider/AppSider';
import AppFooter from './components/appFooter/AppFooter';
import useAppLocation from '../../hooks/useAppLocation';
import useAppFooter from '../../hooks/useAppFooter';

const AppLayout: FunctionComponent = ({ children }) => {
    const appRoute = useAppLocation();
    const { isFooterShown } = useAppFooter();

    const isLayoutHidden = appRoute?.isLayoutHidden === true;

    if (isLayoutHidden) {
        return <>{children}</>;
    }

    return (
        <Layout className={styles.container}>
            <AppHeader />
            <Layout className={styles.mainLayout}>
                <AppSider />
                <Content
                    className={styles.contentContainer}
                    // style={{
                    //     minHeight: isFooterShown ? 'calc(100vh - 64px)' : 'calc(100vh - 164px)'
                    // }}
                >
                    {children}
                </Content>
            </Layout>
            {isFooterShown && <AppFooter />}
        </Layout>
    );
};

export default AppLayout;
