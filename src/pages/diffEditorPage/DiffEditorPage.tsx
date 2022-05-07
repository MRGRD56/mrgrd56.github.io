import React from 'react';
import { editor } from 'monaco-editor';
import AppDiffEditor from '../../components/appDiffEditor/AppDiffEditor';
import MonacoLanguageSelect from '../../components/MonacoLanguageSelect';
import MonacoLanguage from '../../types/MonacoLanguage';
import { useLocalstorageState } from 'rooks';
import getLocalStorageKey from '../../utils/getLocalStorageKey';
import SingleConverterPageContainer from '../../layouts/pages/singleConverterPageContainer/SingleConverterPageContainer';
import styles from './DiffEditorPage.module.scss';

const options: editor.IDiffEditorConstructionOptions = {
    originalEditable: true
};

const DiffEditorPage = () => {
    const [language, setLanguage] = useLocalstorageState<MonacoLanguage>(
        getLocalStorageKey('diff-editor', 'language'),
        'plaintext'
    );

    return (
        <SingleConverterPageContainer
            title="Diff Editor"
            titleExtra={
                <MonacoLanguageSelect value={language} onChange={setLanguage} className={styles.languageSelect} />
            }
        >
            <AppDiffEditor options={options} language={language} />
        </SingleConverterPageContainer>
    );
};

export default DiffEditorPage;
