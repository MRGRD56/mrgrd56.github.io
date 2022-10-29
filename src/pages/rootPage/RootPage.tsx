import React, { FunctionComponent, useCallback, useMemo } from 'react';
import Paragraph from 'antd/lib/typography/Paragraph';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import styles from './RootPage.module.scss';
import ExternalLink from '../../components/ExternalLink';
import { Alert, Empty, Tooltip } from 'antd';
import { routes } from '../../constants/router/routes';
import Text from 'antd/lib/typography/Text';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Flex from '../../components/flex/Flex';
import Search from 'antd/lib/input/Search';
import AppRoutesCards from './components/appRouteCard/AppRoutesCards';
import menuItems from '../../constants/router/menuItems';
import {
    getMenuItemTitle,
    isParentMenuItem,
    isRouteMenuItem,
    ParentMenuItem,
    SingleMenuItem
} from '../../layouts/appLayout/utils/routeMenuItems';
import { useAppSettingsState } from '../../hooks/useAppSettings';
import useInputState from '../../hooks/useInputState';
import { isEmpty } from 'lodash';
import GithubLogo from '../../assets/components/GithubLogo';
import useChangeStateHandler from '../../hooks/useChangeStateHandler';
import DisqusThread from '../../components/disqusThread/DisqusThread';
import { DiscussionEmbed } from 'disqus-react';
import yam from '../../utils/analytics/yam';

const RootPage: FunctionComponent = () => {
    const {
        appSettings: { doShowHiddenMenuItems, isRootPageInfoAlertHidden, isRootPageGithubLinkHidden },
        setAppSettings
    } = useAppSettingsState();

    const handleAppSettingChange = useChangeStateHandler(setAppSettings);

    const [searchQuery, , setSearchQueryByEvent] = useInputState<string>('');

    const allToolsCardItems = useMemo<SingleMenuItem[]>(() => {
        const toolsParentItem = menuItems.find(
            (item) => isParentMenuItem(item) && item.title === 'Tools'
        ) as ParentMenuItem;
        const toolsItems = toolsParentItem.items as SingleMenuItem[];

        return toolsItems.filter((item) => doShowHiddenMenuItems || !item.isHidden);
    }, [doShowHiddenMenuItems]);

    const visibleToolsCardItems = useMemo<SingleMenuItem[]>(() => {
        return allToolsCardItems.filter((item) => {
            const query = searchQuery.trim().toLocaleLowerCase();

            if (isEmpty(query)) {
                return true;
            }

            const isMatchByTitle = () => item.title && String(item.title).toLocaleLowerCase().includes(query);
            const isMatchByRouteTitle = () =>
                isRouteMenuItem(item) && String(item.route.title).toLocaleLowerCase().includes(query);
            const isMatchByDescription = () =>
                item.description && String(item.description).toLocaleLowerCase().includes(query);
            const isMatchBySearchText = () =>
                item.searchText && String(item.searchText).toLocaleLowerCase().includes(query);

            return isMatchByTitle() || isMatchByRouteTitle() || isMatchByDescription() || isMatchBySearchText();
        });
    }, [allToolsCardItems, searchQuery]);

    const handleInfoAlertClose = useCallback(() => {
        setTimeout(() => {
            handleAppSettingChange('isRootPageInfoAlertHidden')(true);
        }, 1500);
    }, []);

    return (
        <>
            {!isRootPageGithubLinkHidden && (
                <Tooltip title="Visit website repository" placement="bottomLeft">
                    <ExternalLink
                        className={styles.githubButton}
                        href="https://github.com/MRGRD56/mrgrd56.github.io"
                        onClick={() => yam.reachGoal('externalLink_githubRepository')}
                    >
                        <GithubLogo className={styles.githubButtonIcon} />
                    </ExternalLink>
                </Tooltip>
            )}

            <PageContainer contentClassName={styles.container} withComments>
                <Flex col gap={8} className={styles.contentContainer}>
                    {!isRootPageInfoAlertHidden && (
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
                        <h2 className="mt-0 mb-0">Tools</h2>

                        <Search
                            className={styles.pageSearch}
                            placeholder="Search tools"
                            value={searchQuery}
                            onChange={setSearchQueryByEvent}
                            allowClear
                        />

                        <div className="mt-1">
                            {visibleToolsCardItems.length ? (
                                <AppRoutesCards items={visibleToolsCardItems} />
                            ) : (
                                <Empty
                                    className="mt-2"
                                    description={
                                        <Flex col>
                                            <div>No tools found</div>
                                            <Text type="secondary">
                                                But you can{' '}
                                                <ExternalLink href="https://github.com/MRGRD56/mrgrd56.github.io/issues/new">
                                                    suggest
                                                </ExternalLink>{' '}
                                                one
                                            </Text>
                                        </Flex>
                                    }
                                />
                            )}
                        </div>
                    </Flex>

                    <Text className={styles.helperTags}>
                        {allToolsCardItems
                            .map((item) =>
                                [getMenuItemTitle(item), item.description, item.searchText].filter(Boolean).join('; ')
                            )
                            .filter(Boolean)
                            .join(', ')}
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
