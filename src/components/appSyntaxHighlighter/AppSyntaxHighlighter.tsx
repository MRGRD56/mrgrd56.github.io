import React, { FunctionComponent } from 'react';
import { Prism, SyntaxHighlighterProps } from 'react-syntax-highlighter';
import useAppTheme from '../../hooks/useAppTheme';
// @ts-ignore
import oneDark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark';
// @ts-ignore
import oneLight from 'react-syntax-highlighter/dist/esm/styles/prism/one-light';
import PrismLanguage from './types/PrismLanguage';

export interface AppSyntaxHighlighterProps extends Omit<SyntaxHighlighterProps, 'style'> {
    language?: PrismLanguage;
    children: string | string[];
}

const AppSyntaxHighlighter: FunctionComponent<AppSyntaxHighlighterProps> = ({ children, ...props }) => {
    const { isDarkMode } = useAppTheme();

    return (
        <Prism {...props} style={isDarkMode ? oneDark : oneLight}>
            {children}
        </Prism>
    );
};

export default AppSyntaxHighlighter;
