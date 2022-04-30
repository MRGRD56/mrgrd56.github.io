import AppSettings from '../types/AppSettings';
import { useLocalstorageState } from 'rooks';
import { APP_SETTINGS_LOCALSTORAGE } from '../constants/localStorage';
import checkBrowserTheme from '../utils/checkBrowserTheme';

const initialState: AppSettings = {
    isDarkMode: checkBrowserTheme('dark'),
    isErudaEnabled: false
};

export const useAppSettingsState = () => {
    return useLocalstorageState<AppSettings>(APP_SETTINGS_LOCALSTORAGE, initialState);
};

const useAppSettings = () => {
    const [appSettings] = useAppSettingsState();
    return appSettings;
};

export default useAppSettings;
