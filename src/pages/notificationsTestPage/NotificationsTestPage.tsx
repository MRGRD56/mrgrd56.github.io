import React, { FunctionComponent, useCallback, useState } from 'react';
import PageContainer from '../../components/pageContainer/PageContainer';
import { Button, Col, notification, Tooltip } from 'antd';
import Text from 'antd/lib/typography/Text';
import styles from './NotificationsTestPage.module.scss';
import { ReloadOutlined } from '@ant-design/icons';
import AppEditor from '../../components/appEditor/AppEditor';
import { editor } from 'monaco-editor';
import scopedEval from '../../utils/scopedEval';
import { BaseType } from 'antd/lib/typography/Base';

const editorOptions: editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false },
    fontFamily: 'JetBrains Mono'
};

const permissionColors: Readonly<Record<NotificationPermission, BaseType | undefined>> = {
    default: undefined,
    denied: 'danger',
    granted: 'success'
};

const NotificationsTestPage: FunctionComponent = () => {
    const [permission, setPermission] = useState<NotificationPermission>(Notification.permission);
    const [notificationCreationJs, setNotificationCreationJs] = useState<string>("new Notification('Hello world')");

    const permissionColor = permissionColors[permission];

    const updateNotificationPermission = useCallback(() => {
        setPermission(Notification.permission);
    }, []);

    const handleRequestPermission = useCallback(async () => {
        const givenPermission = await Notification.requestPermission();
        notification.info({
            message: `Given permission: ${givenPermission}`
        });
        setPermission(givenPermission);
    }, []);

    const createNotification = useCallback(async () => {
        const createdNotification = scopedEval(notificationCreationJs);
        if (!(createdNotification instanceof Notification)) {
            notification.error({
                message: `Created object is not an instance of Notification, got ${
                    createdNotification?.constructor?.name ?? typeof notification
                }`
            });
            return;
        }

        console.log(createdNotification);
    }, [notificationCreationJs]);

    return (
        <PageContainer title="JS Notifications Test">
            <Col xs={23} md={20} lg={18} className={styles.container}>
                <Text>
                    <Tooltip title="Notification.permission" placement="bottom">
                        <Text strong>Permission:</Text>
                        <Text className="ms-1" type={permissionColor}>
                            {permission}
                        </Text>
                    </Tooltip>
                    <Button
                        icon={<ReloadOutlined />}
                        size="small"
                        type="text"
                        className="ms-1"
                        onClick={updateNotificationPermission}
                    />
                </Text>
                <Tooltip title="Notification.requestPermission" placement="bottom">
                    <Button onClick={handleRequestPermission}>Request permission</Button>
                </Tooltip>
                <AppEditor
                    language="javascript"
                    width="100%"
                    height={160}
                    value={notificationCreationJs}
                    onChange={setNotificationCreationJs}
                    options={editorOptions}
                />
                <Button type="primary" onClick={createNotification}>
                    Send notification
                </Button>
            </Col>
        </PageContainer>
    );
};

export default NotificationsTestPage;
