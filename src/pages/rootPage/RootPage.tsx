import React, { FunctionComponent, useCallback, useMemo, useState } from 'react';
import Paragraph from 'antd/lib/typography/Paragraph';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import { ReactComponent as ForkMeOnGitHub } from './assets/forkMeOnGitHub.svg';
import styles from './RootPage.module.scss';
import ExternalLink from '../../components/ExternalLink';
import { Alert, Col } from 'antd';
import { appRoutesList, routes } from '../../constants/router/routes';
import Text from 'antd/lib/typography/Text';
import { Link } from 'react-router-dom';
import PageCol from '../../components/pageCol/PageCol';
import { useLocalstorageState } from 'rooks';
import getLocalStorageKey from '../../utils/getLocalStorageKey';
import classNames from 'classnames';
import Flex from '../../components/flex/Flex';
import Search from 'antd/lib/input/Search';
import AppRoutesCards from './components/appRouteCard/AppRoutesCards';
import menuItems from '../../constants/router/menuItems';
import { ParentMenuItem, RouteMenuItem } from '../../layouts/appLayout/utils/routeMenuItems';
import useAppSettings from '../../hooks/useAppSettings';

const RootPage: FunctionComponent = () => {
    const { doShowHiddenMenuItems } = useAppSettings();
    const [isInfoAlertShown, setIsInfoAlertShown] = useLocalstorageState<boolean>(
        getLocalStorageKey('root', 'isInfoAlertShown'),
        true
    );

    const toolsCardItems = useMemo(() => {
        const toolsParentItem = menuItems.find((item) => 'routes' in item && item.title === 'Tools') as ParentMenuItem;
        const toolsItems = toolsParentItem.routes as RouteMenuItem[];

        return toolsItems.filter((item) => doShowHiddenMenuItems || !item.isHidden);
    }, [doShowHiddenMenuItems]);

    const handleInfoAlertClose = useCallback(() => {
        setTimeout(() => {
            setIsInfoAlertShown(false);
        }, 1500);
    }, []);

    return (
        <>
            <ExternalLink className={styles.forkMeOnGitHub} href="https://github.com/MRGRD56/mrgrd56.github.io">
                <ForkMeOnGitHub />
            </ExternalLink>

            <PageContainer contentClassName={styles.container}>
                <Flex col gap={8} className={styles.contentContainer}>
                    {isInfoAlertShown && (
                        <Alert
                            className={classNames('app-alert', styles.appInfoAlert)}
                            type="info"
                            closable
                            onClose={handleInfoAlertClose}
                            message={
                                <>
                                    <Paragraph>
                                        Hello! Here you can find different useful tools for development and more.
                                    </Paragraph>
                                    <Paragraph>
                                        You can look at the menu on the <span className="d-none d-lg-inline">left</span>
                                        <span className="d-lg-none">right</span>.<br />
                                        Also, you can find the tool you need right on this page.
                                    </Paragraph>
                                    <Paragraph className="mb-0">
                                        You can set up some things on this website, just go to{' '}
                                        <Link to={routes.settings.path}>the settings page</Link>.<br />
                                        The source code of this website is open and you can find it in{' '}
                                        <ExternalLink href="https://github.com/MRGRD56/mrgrd56.github.io">
                                            the GitHub repository
                                        </ExternalLink>
                                        .
                                    </Paragraph>
                                </>
                            }
                        />
                    )}

                    <Flex col gap={8}>
                        <Search className={styles.pageSearch} placeholder="Search tools"></Search>

                        <div>
                            <AppRoutesCards heading="Tools" items={toolsCardItems} />
                        </div>
                    </Flex>

                    <Text className={styles.helperTags}>
                        {appRoutesList.map((route) => route.title).join(', ')}
                        {', '}
                        Clock with seconds
                    </Text>
                </Flex>

                {/*{isFooterHidden && (*/}
                {/*    <AppFooter className={styles.footer}/>*/}
                {/*)}*/}
            </PageContainer>
        </>
    );
};

export default RootPage;
