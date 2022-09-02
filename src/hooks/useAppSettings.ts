import AppSettings from '../types/AppSettings';
import { useLocalstorageState } from 'rooks';
import { APP_SETTINGS_LOCALSTORAGE } from '../constants/localStorage';
import { SpecialAppTheme } from '../types/AppTheme';
import { useEffect, useMemo } from 'react';

const initialState: AppSettings = {
    theme: SpecialAppTheme.AUTO,
    isErudaEnabled: false,
    doShowHiddenMenuItems: false,
    isFooterHidden: true,
    isRootPageInfoAlertHidden: false,
    isRootPageGithubLinkHidden: false
};

export const useAppSettingsState = () => {
    const [appSettings, setAppSettings, clearAppSettings] = useLocalstorageState<AppSettings>(
        APP_SETTINGS_LOCALSTORAGE,
        initialState
    );

    useEffect(() => {
        // forOwn(appSettings, (value, rawKey) => {
        //     const key = rawKey as keyof AppSettings;
        //
        //     const defaultValue = initialState[key];
        //     if (defaultValue !== undefined && typeof defaultValue !== typeof value) {
        //         setAppSettings(settings => ({
        //             ...settings,
        //             [key]: defaultValue
        //         }));
        //     }
        // });
        if (!appSettings.theme || !['light', 'dark', 'auto'].includes(appSettings.theme)) {
            setAppSettings((settings) => ({
                ...settings,
                theme: initialState.theme
            }));
        }
    }, []);

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
