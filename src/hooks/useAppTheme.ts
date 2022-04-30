import useAppSettings from './useAppSettings';
import { useMemo } from 'react';
import AppTheme from '../types/AppTheme';
import checkBrowserTheme from '../utils/checkBrowserTheme';

interface AppThemeHook {
    theme: AppTheme;
    isDarkMode: boolean;
}

const useAppTheme = () => {
    const settings = useAppSettings();

    return useMemo<AppThemeHook>(() => {
        const theme =
            settings.theme === 'AUTO' ? (checkBrowserTheme('dark') ? AppTheme.DARK : AppTheme.LIGHT) : settings.theme;

        return {
            theme,
            isDarkMode: theme === AppTheme.DARK
        };
    }, [settings.theme]);
};

export default useAppTheme;
