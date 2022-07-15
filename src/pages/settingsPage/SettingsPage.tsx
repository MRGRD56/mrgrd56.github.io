import React, { FunctionComponent, useCallback, useMemo } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import { Button, Modal, Select, Switch } from 'antd';
import { useAppSettingsState } from '../../hooks/useAppSettings';
import ExternalLink from '../../components/ExternalLink';
import AppTheme, { SpecialAppTheme } from '../../types/AppTheme';
import styles from './SettingsPage.module.scss';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import useChangeStateHandler from '../../hooks/useChangeStateHandler';
import PageCol from '../../components/pageCol/PageCol';

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
            <PageCol className={styles.formContainer}>
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
                <label>
                    <Switch
                        checked={appSettings.doShowHiddenMenuItems}
                        onChange={handleAppSettingChange('doShowHiddenMenuItems')}
                    />
                    <span className="ms-3">Show hidden menu items</span>
                </label>
                <label>
                    <Switch checked={appSettings.isFooterHidden} onChange={handleAppSettingChange('isFooterHidden')} />
                    <span className="ms-3">Hide the footer</span>
                </label>
            </PageCol>
        </PageContainer>
    );
};

export default SettingsPage;
