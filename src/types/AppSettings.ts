import { SelectableAppTheme } from './AppTheme';

interface AppSettings {
    theme: SelectableAppTheme;
    isErudaEnabled: boolean;
    doShowHiddenMenuItems: boolean;
    isFooterHidden: boolean;
    isRootPageInfoAlertHidden: boolean;
    isRootPageGithubLinkHidden: boolean;
}

export default AppSettings;
