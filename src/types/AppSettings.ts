import { SelectableAppTheme } from './AppTheme';

interface AppSettings {
    theme: SelectableAppTheme;
    isErudaEnabled: boolean;
    doShowHiddenMenuItems: boolean;
    isFooterHidden: boolean;
}

export default AppSettings;
