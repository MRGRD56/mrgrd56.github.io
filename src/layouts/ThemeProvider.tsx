import React, { FunctionComponent, useEffect } from 'react';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { PUBLIC_URL } from '../constants/env';
import useAppTheme from '../hooks/useAppTheme';
import yam from '../utils/analytics/yam';
import useSpecialEffect from '../hooks/useSpecialEffect';
import { useDidMount } from 'rooks';

const themes = {
    light: `${PUBLIC_URL}/styles/antd/antd.min.css`,
    dark: `${PUBLIC_URL}/styles/antd/antd.dark.min.css`
};

const insertionPoint = document.querySelector('#theme-styles-insertion-point') as HTMLElement;

const ThemeProvider: FunctionComponent = ({ children }) => {
    const { isDarkMode, theme, browserTheme } = useAppTheme();

    const providerTheme = isDarkMode ? 'dark' : 'light';

    useDidMount(() => {
        yam.userParams({
            isDarkMode,
            theme,
            browserTheme
        });
    });

    useSpecialEffect(
        () => {
            yam.reachGoal(
                `switchTheme_${providerTheme}`,
                {
                    isDarkMode,
                    theme,
                    browserTheme
                },
                true
            );
        },
        [providerTheme],
        { skipFirstRender: true }
    );

    return (
        <ThemeSwitcherProvider themeMap={themes} defaultTheme={providerTheme} insertionPoint={insertionPoint}>
            {children}
        </ThemeSwitcherProvider>
    );
};

export default ThemeProvider;
