import React, { FunctionComponent, useCallback, useMemo } from 'react';
import PageContainer from '../../components/pageContainer/PageContainer';
import { Button, Col, Modal, Select, Switch } from 'antd';
import { useAppSettingsState } from '../../hooks/useAppSettings';
import ExternalLink from '../../components/ExternalLink';
import AppTheme, { SpecialAppTheme } from '../../types/AppTheme';
import styles from './SettingsPage.module.scss';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import useChangeStateHandler from '../../hooks/useChangeStateHandler';

const SettingsPage: FunctionComponent = () => {
    const { appSettings, setAppSettings, resetAppSettings } = useAppSettingsState();

    const handleAppSettingChange = useChangeStateHandler(setAppSettings);

    const handleResetClick = useCallback(() => {
        Modal.confirm({
            title: 'Are you sure you want to reset the settings?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                resetAppSettings();
            }
        });
    }, [resetAppSettings]);

    const titleExtra = useMemo(() => <Button onClick={handleResetClick}>Reset</Button>, [handleResetClick]);

    return (
        <PageContainer title="Settings" titleExtra={titleExtra}>
            <Col xs={24} md={18} lg={14} xl={10} xxl={8} className={styles.formContainer}>
                <label className={styles.formItem}>
                    <span className={styles.label}>App theme</span>
                    <Select
                        className={styles.input}
                        value={appSettings.theme}
                        onChange={handleAppSettingChange('theme')}
                    >
                        <Select.Option key={SpecialAppTheme.AUTO}>Auto</Select.Option>
                        <Select.Option key={AppTheme.LIGHT}>Light</Select.Option>
                        <Select.Option key={AppTheme.DARK}>Dark</Select.Option>
                    </Select>
                </label>
                <label>
                    <Switch checked={appSettings.isErudaEnabled} onChange={handleAppSettingChange('isErudaEnabled')} />
                    <span className="ms-3">
                        Enable <ExternalLink href="https://github.com/liriliri/eruda">Eruda</ExternalLink>
                    </span>
                </label>
            </Col>
        </PageContainer>
    );
};

export default SettingsPage;
