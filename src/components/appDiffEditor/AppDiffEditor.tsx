import React, { FunctionComponent } from 'react';
import { DiffEditor, DiffEditorProps } from '@monaco-editor/react';
import classNames from 'classnames';
import useAppTheme from '../../hooks/useAppTheme';
import { Spin } from 'antd';

const loadingNode = <Spin size="large" />;

type Props = DiffEditorProps;

const AppDiffEditor: FunctionComponent<Props> = ({ className, loading, theme, ...props }) => {
    const { isDarkMode } = useAppTheme();

    return (
        <DiffEditor
            theme={theme ?? (isDarkMode ? 'vs-dark' : 'light')}
            className={classNames('app-monaco-editor', className)}
            loading={loading ?? loadingNode}
            {...props}
        />
    );
};

export default AppDiffEditor;
