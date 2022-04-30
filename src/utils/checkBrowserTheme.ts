export type BrowserTheme = 'light' | 'dark';

const checkBrowserTheme = (theme: BrowserTheme) => {
    return window.matchMedia?.(`(prefers-color-scheme: ${theme})`).matches;
};

export default checkBrowserTheme;
