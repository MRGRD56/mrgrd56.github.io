import React, { useCallback, useMemo, useState } from 'react';
import PageContainer from '../../components/pageContainer/PageContainer';
import { Alert, Button, Col, Popover, Row, Tooltip } from 'antd';
import styles from './JsonToTypeScriptPage.module.scss';
import classNames from 'classnames';
import AppEditor from '../../components/appEditor/AppEditor';
import { editor } from 'monaco-editor';
import { useDebouncedMemo } from '../../hooks/debouncedMemo';
import ExportType from './types/ExportType';
import convertJsonToTypeScript from './utils/convertJsonToTypeScript';
import { SettingOutlined } from '@ant-design/icons';
import getErrorMessage from '../../utils/getErrorMessage';
import CopyButton from '../../components/copyButton/CopyButton';
import { useLocalstorageState } from 'rooks';
import getLocalStorageKey from '../../utils/getLocalStorageKey';
import JsonToTypeScriptConversionSelectableOptions, {
    NameTransformer
} from './types/JsonToTypeScriptConversionSelectableOptions';
import JsonToTypeScriptConversionOptions from './types/JsonToTypeScriptConversionOptions';
import { camelCase, kebabCase, snakeCase } from 'lodash';
import pascalCase from '../../utils/pascalCase';
import JsonToTypeScriptSettings from './components/JsonToTypeScriptSettings';
import screamingSnakeCase from '../../utils/screamingSnakeCase';

const jsonEditorOptions: editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false }
};

const typescriptEditorOptions: editor.IStandaloneEditorConstructionOptions = {
    readOnly: true,
    minimap: { enabled: false }
};

const defaultSelectableConversionOptions: JsonToTypeScriptConversionSelectableOptions = {
    rootTypeName: 'Root',
    exportType: ExportType.ES_MODULE,
    isReversedOrder: true,
    typeNameTransformer: NameTransformer.PASCAL_CASE,
    fieldNameTransformer: NameTransformer.NONE
};

const nameTransformers: Readonly<Record<NameTransformer, (name: string) => string>> = {
    [NameTransformer.NONE]: (name) => name,
    [NameTransformer.CAMEL_CASE]: camelCase,
    [NameTransformer.PASCAL_CASE]: pascalCase,
    [NameTransformer.SNAKE_CASE]: snakeCase,
    [NameTransformer.SCREAMING_SNAKE_CASE]: screamingSnakeCase,
    [NameTransformer.KEBAB_CASE]: kebabCase
};

const getConversionOptions = (
    selectableConversionOptions: JsonToTypeScriptConversionSelectableOptions
): JsonToTypeScriptConversionOptions => {
    const { fieldNameTransformer, typeNameTransformer, ...restOptions } = selectableConversionOptions;

    return {
        ...restOptions,
        fieldNameTransformer: nameTransformers[fieldNameTransformer],
        typeNameTransformer: nameTransformers[typeNameTransformer]
    };
};

const JsonToTypeScriptPage = () => {
    const [json, setJson] = useState<string>('');
    const [error, setError] = useState<string>();
    const [isSettingsTooltipVisible, setIsSettingsTooltipVisible] = useState<boolean>(false);
    const [isSettingsVisible, setIsSettingsVisible] = useState<boolean>(false);

    const [selectableConversionOptions, setSelectableConversionOptions] =
        useLocalstorageState<JsonToTypeScriptConversionSelectableOptions>(
            getLocalStorageKey('json-to-typescript', 'conversionOptions'),
            defaultSelectableConversionOptions
        );

    const conversionOptions = useMemo(() => {
        return getConversionOptions(selectableConversionOptions);
    }, [selectableConversionOptions]);

    const typeScript = useDebouncedMemo(
        { json, conversionOptions },
        ({ json, conversionOptions }, noResult) => {
            if (!json?.trim()) {
                setError(undefined);
                return '';
            }

            try {
                const result = convertJsonToTypeScript(json, conversionOptions);

                setError(undefined);

                return result;
            } catch (e) {
                setError(getErrorMessage(e));

                return noResult;
            }
        },
        [json, conversionOptions],
        50
    );

    const handleSettingsClick = useCallback(() => {
        setIsSettingsVisible((isVisible) => !isVisible);
        setIsSettingsTooltipVisible(false);
    }, []);

    const handleSettingsTooltipVisibleChange = useCallback(
        (value: boolean) => {
            if (!isSettingsVisible) {
                setIsSettingsTooltipVisible(value);
            }
        },
        [isSettingsVisible]
    );

    return (
        <PageContainer noPadding className={styles.pageContainer}>
            <Row className={styles.container}>
                <Col xs={12} className={classNames(styles.col, styles.colLeft)}>
                    <div className={styles.colHeader}>
                        <h3 className={styles.colTitle}>JSON</h3>
                        <Popover
                            trigger="click"
                            visible={isSettingsVisible}
                            onVisibleChange={setIsSettingsVisible}
                            content={
                                <JsonToTypeScriptSettings
                                    options={selectableConversionOptions}
                                    setOptions={setSelectableConversionOptions}
                                    onClose={handleSettingsClick}
                                />
                            }
                            placement="bottomRight"
                        >
                            <Tooltip
                                title="Settings"
                                placement="bottomRight"
                                visible={isSettingsVisible ? false : isSettingsTooltipVisible}
                                onVisibleChange={handleSettingsTooltipVisibleChange}
                            >
                                <Button type="text" icon={<SettingOutlined />} onClick={handleSettingsClick} />
                            </Tooltip>
                        </Popover>
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
