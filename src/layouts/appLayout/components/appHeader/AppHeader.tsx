import React, { CSSProperties, useCallback, useState } from 'react';
import { Header } from 'antd/lib/layout/layout';
import styles from './AppHeader.module.scss';
import Text from 'antd/lib/typography/Text';
import AppHeaderSearch from './components/appHeaderSearch/AppHeaderSearch';
import { Link } from 'react-router-dom';
import { routes } from '../../../../constants/router/routes';
import { Button, Col, Drawer, Space } from 'antd';
import AppMenu from '../appMenu/AppMenu';
import { MenuOutlined } from '@ant-design/icons';

const drawerBodyStyle: CSSProperties = {
    padding: 1
};

const drawerHeaderStyle: CSSProperties = {
    paddingBottom: 13
};

const drawerContentWrapperStyle: CSSProperties = {
    maxWidth: '100vw'
};

const AppHeader = () => {
    const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>();

    const handleDrawerClose = useCallback(() => {
        setIsDrawerVisible(false);
    }, []);

    const handleMenuButtonClick = useCallback(() => {
        setIsDrawerVisible((value) => !value);
    }, []);

    return (
        <>
            <Drawer
                placement="right"
                visible={isDrawerVisible}
                onClose={handleDrawerClose}
                className={styles.sideMenuDrawer}
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
                        <AppHeaderSearch inputClassName={styles.search} />
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
