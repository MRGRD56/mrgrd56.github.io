import React from 'react';
import ExportType from './types/ExportType';
import convertJsonToTypeScript from './utils/convertJsonToTypeScript';
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
import TextBiConverterPageContainer, {
    RenderOptionsPopover,
    TextBiConvert
} from '../../layouts/pages/textBiConverterPageContainer/TextBiConverterPageContainer';

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

const convert: TextBiConvert<JsonToTypeScriptConversionSelectableOptions> = (json, options) => {
    return convertJsonToTypeScript(json, getConversionOptions(options));
};

const renderOptionsPopover: RenderOptionsPopover<JsonToTypeScriptConversionSelectableOptions> = (
    options,
    setOptions,
    handleClose
) => <JsonToTypeScriptSettings options={options} onOptionsChange={setOptions} onClose={handleClose} />;

const JsonToTypeScriptPage = () => {
    return (
        <TextBiConverterPageContainer
            source1={{ title: 'JSON', language: 'json' }}
            source2={{ title: 'TypeScript', language: 'typescript' }}
            defaultOptions={defaultSelectableConversionOptions}
            convert1to2={convert}
            optionsStorageKey={getLocalStorageKey('json-to-typescript', 'conversionOptions')}
            renderOptionsPopover={renderOptionsPopover}
        />
    );

    // return (
    //     <BiConverterPageContainer
    //         className={styles.pageContainer}
    //         leftTitle="JSON"
    //         leftExtra={
    //             <Popover
    //                 trigger="click"
    //                 visible={isSettingsVisible}
    //                 onVisibleChange={setIsSettingsVisible}
    //                 content={
    //                     <JsonToTypeScriptSettings
    //                         options={selectableConversionOptions}
    //                         setOptions={setSelectableConversionOptions}
    //                         onClose={handleSettingsClick}
    //                     />
    //                 }
    //                 placement="bottomRight"
    //             >
    //                 <Tooltip
    //                     title="Settings"
    //                     placement="bottomRight"
    //                     visible={isSettingsVisible ? false : isSettingsTooltipVisible}
    //                     onVisibleChange={handleSettingsTooltipVisibleChange}
    //                 >
    //                     <Button type="text" icon={<SettingOutlined />} onClick={handleSettingsClick} />
    //                 </Tooltip>
    //             </Popover>
    //         }
    //         left={
    //             <AppEditor
    //                 className={styles.editor}
    //                 language="json"
    //                 options={jsonEditorOptions}
    //                 value={json}
    //                 onChange={setJson}
    //             />
    //         }
    //         rightTitle="TypeScript"
    //         rightExtra={
    //             <Tooltip title="Copy" placement="bottomLeft">
    //                 <CopyButton value={typeScript} type="text" children="" />
    //             </Tooltip>
    //         }
    //         right={
    //             <AppEditor
    //                 className={styles.editor}
    //                 language="typescript"
    //                 options={typescriptEditorOptions}
    //                 value={typeScript}
    //             />
    //         }
    //         extra={error && <Alert className={styles.messageContainer} type="error" showIcon message={error} />}
    //     />
    // );
};

export default JsonToTypeScriptPage;
