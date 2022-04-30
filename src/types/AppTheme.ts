enum AppTheme {
    LIGHT = 'light',
    DARK = 'dark'
}

export enum SpecialAppTheme {
    AUTO = 'auto'
}

export type SelectableAppTheme = AppTheme | SpecialAppTheme;

export default AppTheme;
