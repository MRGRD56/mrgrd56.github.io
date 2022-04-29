import React, { ChangeEvent, FunctionComponent, useCallback } from 'react';
import PageContainer from '../../components/pageContainer/PageContainer';
import AppSettings from '../../types/AppSettings';
import { Space, Switch } from 'antd';
import call from '../../utils/call';
import { isObjectLike } from 'lodash';
import { useAppSettingsState } from '../../hooks/useAppSettings';
import ExternalLink from '../../components/ExternalLink';

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
            <Space direction="vertical">
                <label>
                    <Switch checked={false} onChange={handleAppSettingChange('isDarkMode')} disabled />
                    <span className="ms-3">Dark mode</span>
                </label>
                <label>
                    <Switch checked={appSettings.isErudaEnabled} onChange={handleAppSettingChange('isErudaEnabled')} />
                    <span className="ms-3">
                        Enable <ExternalLink href="https://github.com/liriliri/eruda">Eruda</ExternalLink>
                    </span>
                </label>
            </Space>
        </PageContainer>
    );
};

export default SettingsPage;
