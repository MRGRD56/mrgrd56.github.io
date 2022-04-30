import React from 'react';
import PageContainer from '../components/pageContainer/PageContainer';
import { DiffEditor } from '@monaco-editor/react';
import useAppTheme from '../hooks/useAppTheme';
import { editor } from 'monaco-editor';
import { Spin } from 'antd';

const loadingNode = <Spin size="large" />;

const options: editor.IDiffEditorConstructionOptions = {
    originalEditable: true
};

const DiffEditorPage = () => {
    const { isDarkMode } = useAppTheme();

    return (
        <PageContainer title="Diff Editor">
            <DiffEditor theme={isDarkMode ? 'vs-dark' : 'light'} options={options} loading={loadingNode} />
        </PageContainer>
    );
};

export default DiffEditorPage;
