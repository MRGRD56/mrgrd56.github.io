import React, { FunctionComponent, useCallback, useRef, useState } from 'react';
import PageContainer from '../../components/pageContainer/PageContainer';
import { OnMount } from '@monaco-editor/react';
import { Button, Col, Row, Select } from 'antd';
import styles from './CodeFormatterPage.module.scss';
import MonacoLanguage, { monacoLanguages } from '../../types/MonacoLanguage';
import { useLocalstorageState } from 'rooks';
import { editor, languages } from 'monaco-editor';
import CopyButton from '../../components/copyButton/CopyButton';
import formatCode from '../../utils/formatCode';
import AppEditor from '../../components/appEditor/AppEditor';
import getLocalStorageKey from '../../utils/getLocalStorageKey';

// interface FormattedLanguage {
//     prettierParser: prettier.BuiltInParserName,
//     monacoLanguage: MonacoLanguage
// }

// type FormattedLanguagesMap = Record<BuiltInParserName, MonacoLanguage>;
//
// const formatterLanguagesMap: FormattedLanguagesMap = {
//     'angular': 'typescript',
//     'babel-flow': 'flow9',
//     'babel-ts': 'typescript',
//     'babel': 'javascript',
//     'css': 'css',
//     'espree': 'plaintext',
//     'flow': 'flow9',
//     'glimmer': 'plaintext',
//     'graphql': 'graphql',
//     'html': 'html',
//     'json-stringify': 'json',
//     'json': 'json',
//     'json5': 'json',
//     'less': 'less',
//     'lwc': 'plaintext',
//     'markdown': 'markdown',
//     'mdx': 'markdown',
//     'meriyah': 'plaintext',
//     'scss': 'scss',
//     'typescript': 'typescript',
//     'vue': 'typescript',
//     'yaml': 'yaml'
// };
//
// window.prettier = prettier;

const monacoOptions: editor.IStandaloneEditorConstructionOptions = {
    formatOnPaste: true
};

const CodeFormatterPage: FunctionComponent = () => {
    const [selectedLanguage, setSelectedLanguage] = useLocalstorageState<MonacoLanguage>(
        getLocalStorageKey('code-formatter', 'selectedLanguage'),
        'typescript'
    );
    const [code, setCode] = useState<string>('');

    const monacoEditorRef = useRef<editor.IStandaloneCodeEditor>();

    const handleMonacoMount = useCallback<OnMount>((editor, monaco) => {
        monacoEditorRef.current = editor;

        monaco.languages.registerDocumentFormattingEditProvider('xml', {
            provideDocumentFormattingEdits(
                model: editor.ITextModel,
                options: languages.FormattingOptions
            ): languages.ProviderResult<languages.TextEdit[]> {
                return [
                    {
                        text: formatCode('xml', model.getValue()),
                        range: model.getFullModelRange()
                    }
                ];
            }
        });
    }, []);

    const handleFormatClick = useCallback(() => {
        monacoEditorRef.current?.getAction('editor.action.formatDocument').run();
    }, []);

    return (
        <PageContainer title="Code Formatter">
            <div className={styles.container}>
                <Col className={styles.controlsContainer}>
                    <Row className={styles.formatContainer}>
                        <Select
                            className={styles.languageSelect}
                            value={selectedLanguage}
                            onChange={setSelectedLanguage}
                        >
                            {monacoLanguages.map((language) => (
                                <Select.Option key={language}>{language}</Select.Option>
                            ))}
                        </Select>
                        <Button type="primary" className={styles.formatButton} onClick={handleFormatClick}>
                            Format
                        </Button>
                        <CopyButton value={code} type="default" />
                    </Row>
                </Col>
                <AppEditor
                    className={styles.editor}
                    language={selectedLanguage}
                    value={code}
                    onChange={setCode}
                    options={monacoOptions}
                    onMount={handleMonacoMount}
                />
            </div>
        </PageContainer>
    );
};

export default CodeFormatterPage;
