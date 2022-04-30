enum AppTheme {
    LIGHT = 'light',
    DARK = 'dark'
}

export enum SpecialAppTheme {
    AUTO = 'AUTO'
}

export type SelectableAppTheme = AppTheme | SpecialAppTheme;

export default AppTheme;
