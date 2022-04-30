import React, { FunctionComponent } from 'react';
import useAppSettings from '../hooks/useAppSettings';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { PUBLIC_URL } from '../constants/env';

const themes = {
    light: `${PUBLIC_URL}/styles/antd/antd.min.css`,
    dark: `${PUBLIC_URL}/styles/antd/antd.dark.min.css`
};

const insertionPoint = document.querySelector('#app-title') as HTMLElement;

const ThemeProvider: FunctionComponent = ({ children }) => {
    const { isDarkMode } = useAppSettings();

    const theme = isDarkMode ? 'dark' : 'light';

    return (
        <ThemeSwitcherProvider themeMap={themes} defaultTheme={theme} insertionPoint={insertionPoint}>
            {children}
        </ThemeSwitcherProvider>
    );
};

export default ThemeProvider;
