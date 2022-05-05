import React from 'react';
import PageContainer from '../../components/pageContainer/PageContainer';
import { editor } from 'monaco-editor';
import AppDiffEditor from '../../components/appDiffEditor/AppDiffEditor';

const options: editor.IDiffEditorConstructionOptions = {
    originalEditable: true
};

const DiffEditorPage = () => {
    return (
        <PageContainer title="Diff Editor">
            <AppDiffEditor options={options} />
        </PageContainer>
    );
};

export default DiffEditorPage;
