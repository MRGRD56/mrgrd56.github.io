import AppSettings from '../types/AppSettings';
import { useLocalstorageState } from 'rooks';
import { APP_SETTINGS_LOCALSTORAGE } from '../constants/localStorage';

const initialState: AppSettings = {
    isDarkMode: false,
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