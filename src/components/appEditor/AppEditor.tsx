import React, { FunctionComponent, useCallback, useMemo } from 'react';
import Editor, { EditorProps, OnChange } from '@monaco-editor/react';
import useAppTheme from '../../hooks/useAppTheme';
import { Spin } from 'antd';
import classNames from 'classnames';
import * as monaco from 'monaco-editor';
import MonacoLanguage from '../../types/MonacoLanguage';
import { editor } from 'monaco-editor';

const loadingNode = <Spin size="large" />;

export type AppOnChange = (value: string, ev: monaco.editor.IModelContentChangedEvent) => void;

const defaultOptions: Readonly<editor.IStandaloneEditorConstructionOptions> = {
    minimap: { enabled: false }
};

export interface AppEditorProps extends Omit<EditorProps, 'onChange'> {
    onChange?: AppOnChange;
    language?: MonacoLanguage;
}

const AppEditor: FunctionComponent<AppEditorProps> = ({ className, loading, theme, onChange, options, ...props }) => {
    const { isDarkMode } = useAppTheme();

    const editorOptions = useMemo(
        () => ({
            ...defaultOptions,
            ...options
        }),
        [options]
    );

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
            options={editorOptions}
            {...props}
        />
    );
};

export default AppEditor;
