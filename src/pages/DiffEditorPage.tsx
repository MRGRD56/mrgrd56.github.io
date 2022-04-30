import React from 'react';
import PageContainer from '../components/pageContainer/PageContainer';
import { DiffEditor } from '@monaco-editor/react';
import useAppTheme from '../hooks/useAppTheme';
import { editor } from 'monaco-editor';

const options: editor.IDiffEditorConstructionOptions = {
    originalEditable: true
};

const DiffEditorPage = () => {
    const { isDarkMode } = useAppTheme();

    return (
        <PageContainer title="Diff Editor">
            <DiffEditor theme={isDarkMode ? 'vs-dark' : 'light'} options={options} />
        </PageContainer>
    );
};

export default DiffEditorPage;
