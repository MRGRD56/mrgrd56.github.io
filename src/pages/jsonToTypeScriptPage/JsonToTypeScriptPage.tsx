import React, { useState } from 'react';
import PageContainer from '../../components/pageContainer/PageContainer';
import { Alert, Button, Col, Row, Tooltip } from 'antd';
import styles from './JsonToTypeScriptPage.module.scss';
import classNames from 'classnames';
import AppEditor from '../../components/appEditor/AppEditor';
import { editor } from 'monaco-editor';
import { useDebouncedMemo } from '../../hooks/debouncedMemo';
import ExportType from './types/ExportType';
import convertJsonToTypeScript from './utils/convertJsonToTypeScript';
import { camelCase } from 'lodash';
import pascalCase from '../../utils/pascalCase';
import { SettingOutlined } from '@ant-design/icons';
import getErrorMessage from '../../utils/getErrorMessage';
import CopyButton from '../../components/copyButton/CopyButton';

const jsonEditorOptions: editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false }
};

const typescriptEditorOptions: editor.IStandaloneEditorConstructionOptions = {
    readOnly: true,
    minimap: { enabled: false }
};

const JsonToTypeScriptPage = () => {
    const [json, setJson] = useState<string>('');

    const [error, setError] = useState<string>();

    const typeScript = useDebouncedMemo(
        { json },
        ({ json }, noResult) => {
            if (!json?.trim()) {
                setError(undefined);
                return '';
            }

            try {
                const result = convertJsonToTypeScript(json, {
                    rootTypeName: 'Root',
                    exportType: ExportType.ES_MODULE,
                    isReversedOrder: true,
                    typeNameTransformer: pascalCase,
                    fieldNameTransformer: camelCase
                });

                setError(undefined);

                return result;
            } catch (e) {
                setError(getErrorMessage(e));

                return noResult;
            }
        },
        [json],
        50
    );

    return (
        <PageContainer noPadding className={styles.pageContainer}>
            <Row className={styles.container}>
                <Col xs={12} className={classNames(styles.col, styles.colLeft)}>
                    <div className={styles.colHeader}>
                        <h3 className={styles.colTitle}>JSON</h3>
                        <Tooltip title="Settings" placement="bottom">
                            <Button type="text" icon={<SettingOutlined />} />
                        </Tooltip>
                    </div>
                    <AppEditor
                        className={styles.editor}
                        language="json"
                        options={jsonEditorOptions}
                        value={json}
                        onChange={setJson}
                    />
                </Col>
                <Col xs={12} className={classNames(styles.col, styles.colRight)}>
                    <div className={styles.colHeader}>
                        <h3 className={styles.colTitle}>TypeScript</h3>
                        <Tooltip title="Copy" placement="bottomLeft">
                            <CopyButton value={typeScript} type="text" children="" />
                        </Tooltip>
                    </div>
                    <AppEditor
                        className={styles.editor}
                        language="typescript"
                        options={typescriptEditorOptions}
                        value={typeScript}
                    />
                </Col>
                {error && <Alert className={styles.messageContainer} type="error" showIcon message={error} />}
            </Row>
        </PageContainer>
    );
};

export default JsonToTypeScriptPage;
