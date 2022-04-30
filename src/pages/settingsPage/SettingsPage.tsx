import React, { ChangeEvent, FunctionComponent, useCallback } from 'react';
import PageContainer from '../../components/pageContainer/PageContainer';
import AppSettings from '../../types/AppSettings';
import { Col, Select, Switch } from 'antd';
import call from '../../utils/call';
import { isObjectLike } from 'lodash';
import { useAppSettingsState } from '../../hooks/useAppSettings';
import ExternalLink from '../../components/ExternalLink';
import AppTheme, { SpecialAppTheme } from '../../types/AppTheme';
import styles from './SettingsPage.module.scss';

const isChangeEvent = (value: any): value is ChangeEvent<unknown> => {
    return isObjectLike(value) && 'target' in value;
};

const SettingsPage: FunctionComponent = () => {
    const [appSettings, setAppSettings] = useAppSettingsState();

    const changeAppSetting = useCallback(<K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
        setAppSettings((settings) => ({
            ...settings,
            [key]: value
        }));
    }, []);

    const handleAppSettingChange = useCallback(
        <K extends keyof AppSettings, T extends AppSettings[K]>(key: K) => {
            return (value: ChangeEvent<{ value: T }> | T) => {
                const actualValue = call(() => {
                    if (isChangeEvent(value)) {
                        const event = value as ChangeEvent<{ value: T }>;
                        return event.target.value;
                    }

                    return value;
                });

                changeAppSetting(key, actualValue);
            };
        },
        [changeAppSetting]
    );

    return (
        <PageContainer title="Settings">
            <Col xs={8} className={styles.formContainer}>
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
