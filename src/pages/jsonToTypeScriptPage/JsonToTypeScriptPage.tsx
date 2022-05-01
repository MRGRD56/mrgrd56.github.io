import React, { useState } from 'react';
import PageContainer from '../../components/pageContainer/PageContainer';
import { Col, Row } from 'antd';
import styles from './JsonToTypeScriptPage.module.scss';
import classNames from 'classnames';
import AppEditor from '../../components/appEditor/AppEditor';
import { editor } from 'monaco-editor';
import { useDebouncedMemo } from '../../hooks/debouncedMemo';
import getTypeScriptType from './utils/getTypeScriptType';
import parseJsonObject from './utils/parseJsonObject';
import ExportType from './types/ExportType';
import getAllTypeScriptTypeDeclarations from './utils/getAllTypeScriptTypeDeclarations';

const jsonEditorOptions: editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false }
};

const typescriptEditorOptions: editor.IStandaloneEditorConstructionOptions = {
    readOnly: true,
    minimap: { enabled: false }
};

const JsonToTypeScriptPage = () => {
    const [json, setJson] = useState<string>('');

    const typeScript = useDebouncedMemo(
        { json },
        ({ json }) => {
            if (!json?.trim()) {
                return '';
            }

            const typeScriptType = getTypeScriptType('Root', parseJsonObject(JSON.parse(json)));
            return getAllTypeScriptTypeDeclarations(typeScriptType, 'Root', {
                exportType: ExportType.ES_MODULE,
                isReversedOrder: true
            });
        },
        [json],
        50
    );

    return (
        <PageContainer noPadding className={styles.pageContainer}>
            <Row className={styles.container}>
                <Col xs={12} className={classNames(styles.col, styles.colLeft)}>
                    <h3 className={styles.colTitle}>JSON</h3>
                    <AppEditor
                        className={styles.editor}
                        language="json"
                        options={jsonEditorOptions}
                        value={json}
                        onChange={setJson}
                    />
                </Col>
                <Col xs={12} className={classNames(styles.col, styles.colRight)}>
                    <h3 className={styles.colTitle}>TypeScript</h3>
                    <AppEditor
                        className={styles.editor}
                        language="typescript"
                        options={typescriptEditorOptions}
                        value={typeScript}
                    />
                </Col>
            </Row>
        </PageContainer>
    );
};

export default JsonToTypeScriptPage;
