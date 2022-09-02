import React, { FunctionComponent, useCallback, useMemo } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import { Button, Modal, Select, Switch } from 'antd';
import { useAppSettingsState } from '../../hooks/useAppSettings';
import ExternalLink from '../../components/ExternalLink';
import AppTheme, { SpecialAppTheme } from '../../types/AppTheme';
import styles from './SettingsPage.module.scss';
import { ExclamationCircleOutlined, EyeInvisibleFilled } from '@ant-design/icons';
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
                <h4 className="mt-3 mb-0">Hide elements</h4>
                <label>
                    <Switch
                        checked={appSettings.isFooterHidden}
                        onChange={handleAppSettingChange('isFooterHidden')}
                        checkedChildren={<EyeInvisibleFilled />}
                    />
                    <span className="ms-3 cursor-help" title="The footer will still be visible on some pages">
                        Site footer
                    </span>
                </label>
                <label>
                    <Switch
                        checked={appSettings.isRootPageInfoAlertHidden}
                        onChange={handleAppSettingChange('isRootPageInfoAlertHidden')}
                        checkedChildren={<EyeInvisibleFilled />}
                    />
                    <span className="ms-3">Info alert on the home page</span>
                </label>
                <label>
                    <Switch
                        checked={appSettings.isRootPageGithubLinkHidden}
                        onChange={handleAppSettingChange('isRootPageGithubLinkHidden')}
                        checkedChildren={<EyeInvisibleFilled />}
                    />
                    <span className="ms-3">GitHub repository link on the home page</span>
                </label>
            </PageCol>
        </PageContainer>
    );
};

export default SettingsPage;
