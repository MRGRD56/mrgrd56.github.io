import useAppSettings from './useAppSettings';
import { useMemo } from 'react';
import AppTheme, { SpecialAppTheme } from '../types/AppTheme';
import checkBrowserTheme, { BrowserTheme } from '../utils/checkBrowserTheme';

interface AppThemeHook {
    browserTheme: BrowserTheme;
    theme: AppTheme;
    isDarkMode: boolean;
}

const useAppTheme = () => {
    const settings = useAppSettings();

    return useMemo<AppThemeHook>(() => {
        const browserTheme: BrowserTheme = checkBrowserTheme('dark') ? 'dark' : 'light';

        const theme =
            settings.theme === SpecialAppTheme.AUTO
                ? browserTheme === 'dark'
                    ? AppTheme.DARK
                    : AppTheme.LIGHT
                : settings.theme;

        return {
            browserTheme,
            theme,
            isDarkMode: theme === AppTheme.DARK
        };
    }, [settings.theme]);
};

export default useAppTheme;
