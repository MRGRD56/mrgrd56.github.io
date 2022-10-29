import React, { FunctionComponent } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import styles from './AppLayout.module.scss';
import AppHeader from './components/appHeader/AppHeader';
import AppSider from './components/appSider/AppSider';
import AppFooter from './components/appFooter/AppFooter';
import useAppLocation from '../../hooks/useAppLocation';
import useAppFooter from '../../hooks/useAppFooter';
import { HEADER_HEIGHT } from '../../constants/layout';
import ReactGA from 'react-ga';
import yam from '../../utils/analytics/yam';
import useSpecialEffect from '../../hooks/useSpecialEffect';
import { useDidMount } from 'rooks';
import { routes } from '../../constants/router/routes';

const AppLayout: FunctionComponent = ({ children }) => {
    const appRoute = useAppLocation();
    const { isFooterShown, isFooterAnywayShown, footerHeight } = useAppFooter();

    const isLayoutHidden = appRoute?.isLayoutHidden === true;

    useSpecialEffect(
        ({ isFirstRender }) => {
            const path = window.location.pathname + window.location.search + window.location.hash;
            ReactGA.pageview(path, undefined, appRoute?.title || document.title);

            yam.reachGoal(
                isFirstRender ? 'visitFirstPage' : 'changePage',
                {
                    route: appRoute?.path
                },
                true
            );

            if (appRoute !== routes.tinkoff5BukvSolver) {
                yam.reachGoal('visitPage_notT5b');
            }
            if (appRoute === routes.root) {
                yam.reachGoal('visitPage_root');
            }
        },
        [appRoute]
    );

    useDidMount(() => {
        (async () => {
            if (document.referrer) {
                if (!document.referrer.startsWith(window.location.origin)) {
                    yam.reachGoal('hasReferrer', {
                        referrer: document.referrer
                    });
                }
            }

            try {
                const battery = await (navigator as any).getBattery();

                yam.userParams({
                    hasBattery: true,
                    batteryLevel: battery.level,
                    batteryCharging: battery.charging
                });
            } catch (e) {
                yam.userParams({
                    hasBattery: false
                });
            }
        })();
    });

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
                    style={{
                        minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${isFooterAnywayShown ? footerHeight : 0}px)`
                    }}
                >
                    {children}
                </Content>
            </Layout>
            {isFooterShown && <AppFooter />}
        </Layout>
    );
};

export default AppLayout;
