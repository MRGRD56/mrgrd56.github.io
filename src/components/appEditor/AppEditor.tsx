import React, { FunctionComponent, useCallback } from 'react';
import Editor, { EditorProps, OnChange } from '@monaco-editor/react';
import useAppTheme from '../../hooks/useAppTheme';
import { Spin } from 'antd';
import classNames from 'classnames';
import * as monaco from 'monaco-editor';
import MonacoLanguage from '../../types/MonacoLanguage';

const loadingNode = <Spin size="large" />;

export type AppOnChange = (value: string, ev: monaco.editor.IModelContentChangedEvent) => void;

interface Props extends Omit<EditorProps, 'onChange'> {
    onChange?: AppOnChange;
    language?: MonacoLanguage;
}

const AppEditor: FunctionComponent<Props> = ({ className, loading, theme, onChange, ...props }) => {
    const { isDarkMode } = useAppTheme();

    const handleChange = useCallback<OnChange>(
        (value, ev) => {
            onChange?.(value ?? '', ev);
        },
        [onChange]
    );

    return (
        <Editor
            theme={theme ?? (isDarkMode ? 'vs-dark' : 'light')}
            className={classNames('app-monaco-editor', className)}
            loading={loading ?? loadingNode}
            onChange={handleChange}
            {...props}
        />
    );
};

export default AppEditor;
