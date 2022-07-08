import React, { FunctionComponent } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import useAppTheme from '../../hooks/useAppTheme';
// @ts-ignore
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import PrismLanguage from './types/PrismLanguage';

interface Props extends Omit<SyntaxHighlighterProps, 'style'> {
    language?: PrismLanguage;
    children: string | string[];
}

const AppSyntaxHighlighter: FunctionComponent<Props> = ({ children, ...props }) => {
    const { isDarkMode } = useAppTheme();

    return (
        <SyntaxHighlighter {...props} style={isDarkMode ? oneDark : oneLight}>
            {children}
        </SyntaxHighlighter>
    );
};

export default AppSyntaxHighlighter;
