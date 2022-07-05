import React, { useCallback, useMemo, useState } from 'react';
import { Alert, Button, Popover, Tooltip } from 'antd';
import styles from './JsonToTypeScriptPage.module.scss';
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
import JsonToTypeScriptConversionOptions, {
    NullType,
    ObjectDeclaration,
    UnknownType
} from './types/JsonToTypeScriptConversionOptions';
import { camelCase, kebabCase, snakeCase } from 'lodash';
import pascalCase from '../../utils/pascalCase';
import JsonToTypeScriptSettings from './components/JsonToTypeScriptSettings';
import screamingSnakeCase from '../../utils/screamingSnakeCase';
import DoubleConverterPageContainer from '../../layouts/pages/doubleConverterPageContainer/DoubleConverterPageContainer';

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
    fieldNameTransformer: NameTransformer.NONE,
    isTuplesEnabled: false,
    nullType: NullType.NULL,
    unknownType: UnknownType.UNKNOWN,
    objectDeclaration: ObjectDeclaration.INTERFACE
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
        (noResult) => {
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

                if (e instanceof SyntaxError) {
                    return noResult;
                } else {
                    throw e;
                }
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
        <DoubleConverterPageContainer
            className={styles.pageContainer}
            leftTitle="JSON"
            leftExtra={
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
            }
            left={
                <AppEditor
                    className={styles.editor}
                    language="json"
                    options={jsonEditorOptions}
                    value={json}
                    onChange={setJson}
                />
            }
            rightTitle="TypeScript"
            rightExtra={
                <Tooltip title="Copy" placement="bottomLeft">
                    <CopyButton value={typeScript} type="text" children="" />
                </Tooltip>
            }
            right={
                <AppEditor
                    className={styles.editor}
                    language="typescript"
                    options={typescriptEditorOptions}
                    value={typeScript}
                />
            }
            extra={error && <Alert className={styles.messageContainer} type="error" showIcon message={error} />}
        />
    );
};

export default JsonToTypeScriptPage;
