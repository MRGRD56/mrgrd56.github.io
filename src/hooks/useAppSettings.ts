import AppSettings from '../types/AppSettings';
import { useLocalstorageState } from 'rooks';
import { APP_SETTINGS_LOCALSTORAGE } from '../constants/localStorage';
import { SpecialAppTheme } from '../types/AppTheme';
import { useMemo } from 'react';

const initialState: AppSettings = {
    theme: SpecialAppTheme.AUTO,
    isErudaEnabled: false
};

export const useAppSettingsState = () => {
    const [appSettings, setAppSettings, clearAppSettings] = useLocalstorageState<AppSettings>(
        APP_SETTINGS_LOCALSTORAGE,
        initialState
    );

    return useMemo(
        () => ({
            appSettings,
            setAppSettings,
            resetAppSettings: () => {
                clearAppSettings();
                setAppSettings(initialState);
            }
        }),
        [appSettings, setAppSettings, clearAppSettings]
    );
};

const useAppSettings = () => {
    const { appSettings } = useAppSettingsState();
    return appSettings;
};

export default useAppSettings;
