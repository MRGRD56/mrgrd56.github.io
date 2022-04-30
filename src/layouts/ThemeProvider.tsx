import React, { FunctionComponent } from 'react';
import useAppSettings from '../hooks/useAppSettings';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { PUBLIC_URL } from '../constants/env';

const themes = {
    light: `${PUBLIC_URL}/styles/antd/antd.min.css`,
    dark: `${PUBLIC_URL}/styles/antd/antd.dark.min.css`
};

const ThemeProvider: FunctionComponent = ({ children }) => {
    const { isDarkMode } = useAppSettings();

    const theme = isDarkMode ? 'dark' : 'light';

    return (
        <ThemeSwitcherProvider
            themeMap={themes}
            defaultTheme={theme}
            insertionPoint="antd-theme-styles-insertion-point"
        >
            {children}
        </ThemeSwitcherProvider>
    );
};

export default ThemeProvider;
