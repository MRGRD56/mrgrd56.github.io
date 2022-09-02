import React, { FunctionComponent } from 'react';
import useAppTheme from '../hooks/useAppTheme';
import AppTheme from '../types/AppTheme';

export const createThemedComponent =
    <CP,>(light: FunctionComponent<CP>, dark: FunctionComponent<CP>) =>
    ({ _theme, ...props }: { _theme?: AppTheme } & CP) =>
        <ThemedComponent light={light} dark={dark} _theme={_theme} props={props as unknown as CP} />;

interface Props<CP> {
    light: FunctionComponent<CP>;
    dark: FunctionComponent<CP>;
    _theme?: AppTheme;
    props?: CP;
}

const ThemedComponent = <CP,>({ light, dark, _theme, props = {} as CP }: Props<CP>) => {
    const { isDarkMode } = useAppTheme();
    const isDark = _theme === AppTheme.DARK || (isDarkMode && _theme !== AppTheme.LIGHT);

    const Light = light;
    const Dark = dark;

    return isDark ? <Dark {...props} /> : <Light {...props} />;
};

export default ThemedComponent;
