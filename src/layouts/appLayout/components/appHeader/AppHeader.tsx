import React, { CSSProperties, useCallback, useState } from 'react';
import { Header } from 'antd/lib/layout/layout';
import styles from './AppHeader.module.scss';
import Text from 'antd/lib/typography/Text';
import AppHeaderSearch from './components/appHeaderSearch/AppHeaderSearch';
import { Link } from 'react-router-dom';
import { routes } from '../../../../constants/router/routes';
import { Button, Col, Drawer, Space, Switch, Tooltip } from 'antd';
import AppMenu from '../appMenu/AppMenu';
import { MenuOutlined } from '@ant-design/icons';
import './AppHeader.scss';
import classNames from 'classnames';
import Flex from '../../../../components/flex/Flex';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useAppSettingsState } from '../../../../hooks/useAppSettings';
import useAppTheme from '../../../../hooks/useAppTheme';
import AppTheme from '../../../../types/AppTheme';

const drawerBodyStyle: CSSProperties = {
    padding: 1
};

const drawerHeaderStyle: CSSProperties = {
    paddingBottom: 13
};

const drawerContentWrapperStyle: CSSProperties = {
    width: '400px',
    maxWidth: '100vw'
};

const AppHeader = () => {
    const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>();
    const { isDarkMode } = useAppTheme();
    const { setAppSettings } = useAppSettingsState();

    const handleDrawerClose = useCallback(() => {
        setIsDrawerVisible(false);
    }, []);

    const handleMenuButtonClick = useCallback(() => {
        setIsDrawerVisible((value) => !value);
    }, []);

    const handleThemeSwitch = useCallback(
        (isDark: boolean) => {
            setAppSettings((settings) => ({
                ...settings,
                theme: isDark ? AppTheme.DARK : AppTheme.LIGHT
            }));
        },
        [setAppSettings]
    );

    return (
        <>
            <Drawer
                placement="right"
                visible={isDrawerVisible}
                onClose={handleDrawerClose}
                className={classNames(styles.sideMenuDrawer, 'AppHeader__side-menu-drawer')}
                bodyStyle={drawerBodyStyle}
                headerStyle={drawerHeaderStyle}
                contentWrapperStyle={drawerContentWrapperStyle}
            >
                <AppMenu onItemSelect={handleDrawerClose} />
            </Drawer>

            <Header className={styles.container}>
                <div className={styles.logo}>
                    <Link to={routes.root.path}>
                        <Text strong className={styles.logoText}>
                            MRGRD56
                        </Text>
                    </Link>
                </div>
                {/*<Menu theme="dark"></Menu>*/}
                <Space className={styles.rightPanel}>
                    <Col xs={0} sm={24}>
                        <Flex row gap={20} align="center">
                            <Tooltip overlay={`Switch theme to ${isDarkMode ? 'light' : 'dark'}`} placement="bottom">
                                <Switch
                                    checkedChildren={<DarkMode className={styles.themeSwitchIcon} fontSize="small" />}
                                    unCheckedChildren={
                                        <LightMode className={styles.themeSwitchIcon} fontSize="small" />
                                    }
                                    className={classNames(styles.themeSwitch, 'AppHeader__theme-switch')}
                                    checked={isDarkMode}
                                    onChange={handleThemeSwitch}
                                />
                            </Tooltip>
                            <AppHeaderSearch inputClassName={styles.search} />
                        </Flex>
                    </Col>
                    <Col xs={24} lg={0}>
                        <Button onClick={handleMenuButtonClick} type="text" className={styles.menuButton}>
                            <MenuOutlined />
                        </Button>
                    </Col>
                </Space>
            </Header>
        </>
    );
};

export default AppHeader;
