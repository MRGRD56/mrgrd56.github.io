import React from 'react';
import JsonToTypeScriptConversionSelectableOptions, {
    NameTransformer
} from '../types/JsonToTypeScriptConversionSelectableOptions';
import { Input, Select, Switch, Tag } from 'antd';
import useChangeStateHandler from '../../../hooks/useChangeStateHandler';
import styles from '../../../components/settingsPopover/SettingsPopover.module.scss';
import ExportType from '../types/ExportType';
import Text from 'antd/lib/typography/Text';
import classNames from 'classnames';
import { NullType, ObjectDeclaration, UnknownType } from '../types/JsonToTypeScriptConversionOptions';
import { OptionsPopoverComponent } from '../../../layouts/pages/textBiConverterPageContainer/TextBiConverterPageContainer';
import SettingsPopover from '../../../components/settingsPopover/SettingsPopover';

const JsonToTypeScriptSettings: OptionsPopoverComponent<JsonToTypeScriptConversionSelectableOptions> = ({
    options,
    onOptionsChange,
    onClose
}) => {
    const handleOptionChange = useChangeStateHandler(onOptionsChange);

    return (
        <SettingsPopover onClose={onClose}>
            <label className={styles.formItem}>
                <span className={styles.label}>Root type name</span>
                <Input
                    className={styles.input}
                    value={options.rootTypeName}
                    onChange={handleOptionChange('rootTypeName')}
                />
            </label>
            <label className={styles.formItem}>
                <span className={styles.label}>Export type</span>
                <Select className={styles.input} value={options.exportType} onChange={handleOptionChange('exportType')}>
                    <Select.Option key={ExportType.NONE}>None</Select.Option>
                    <Select.Option key={ExportType.ES_MODULE}>ES Module</Select.Option>
                    <Select.Option key={ExportType.COMMONJS}>
                        <Text type="danger" title="CommonJS">
                            CommonJS
                        </Text>
                    </Select.Option>
                </Select>
            </label>
            <label className={styles.formItem}>
                <span className={styles.label}>Field names</span>
                <Select
                    className={styles.input}
                    value={options.fieldNameTransformer}
                    onChange={handleOptionChange('fieldNameTransformer')}
                >
                    <Select.Option key={NameTransformer.NONE}>Not change</Select.Option>
                    <Select.Option key={NameTransformer.CAMEL_CASE}>camelCase</Select.Option>
                    <Select.Option key={NameTransformer.PASCAL_CASE}>PascalCase</Select.Option>
                    <Select.Option key={NameTransformer.SNAKE_CASE}>snake_case</Select.Option>
                    <Select.Option key={NameTransformer.SCREAMING_SNAKE_CASE}>SCREAMING_SNAKE_CASE</Select.Option>
                    <Select.Option key={NameTransformer.KEBAB_CASE}>kebab-case</Select.Option>
                </Select>
            </label>
            <label className={styles.formItem}>
                <span className={styles.label}>Type names</span>
                <Select
                    className={styles.input}
                    value={options.typeNameTransformer}
                    onChange={handleOptionChange('typeNameTransformer')}
                >
                    <Select.Option key={NameTransformer.NONE}>Not change</Select.Option>
                    <Select.Option key={NameTransformer.CAMEL_CASE}>camelCase</Select.Option>
                    <Select.Option key={NameTransformer.PASCAL_CASE}>PascalCase</Select.Option>
                    <Select.Option key={NameTransformer.SNAKE_CASE}>snake_case</Select.Option>
                    <Select.Option key={NameTransformer.SCREAMING_SNAKE_CASE}>SCREAMING_SNAKE_CASE</Select.Option>
                </Select>
            </label>
            <label className={styles.formItem}>
                <span className={styles.label}>Unknown type</span>
                <Select
                    className={styles.input}
                    value={options.unknownType}
                    onChange={handleOptionChange('unknownType')}
                >
                    <Select.Option key={UnknownType.UNKNOWN}>unknown</Select.Option>
                    <Select.Option key={UnknownType.ANY}>any</Select.Option>
                </Select>
            </label>
            <label className={styles.formItem}>
                <span className={styles.label}>Null type</span>
                <Select className={styles.input} value={options.nullType} onChange={handleOptionChange('nullType')}>
                    <Select.Option key={NullType.NULL}>null</Select.Option>
                    <Select.Option key={NullType.UNDEFINED}>undefined</Select.Option>
                </Select>
            </label>
            <label className={styles.formItem}>
                <span className={styles.label}>Object declaration</span>
                <Select
                    className={styles.input}
                    value={options.objectDeclaration}
                    onChange={handleOptionChange('objectDeclaration')}
                >
                    <Select.Option key={ObjectDeclaration.INTERFACE}>Interface</Select.Option>
                    <Select.Option key={ObjectDeclaration.TYPE}>Type</Select.Option>
                </Select>
            </label>

            <label className={classNames('mt-1', styles.formItem)}>
                <Switch checked={options.isReversedOrder} onChange={handleOptionChange('isReversedOrder')} />
                <span className="ms-3">Reverse declarations</span>
            </label>
            <label className={classNames('mt-1', styles.formItem)}>
                <Switch checked={options.isTuplesEnabled} onChange={handleOptionChange('isTuplesEnabled')} />
                <Text className="ms-3">
                    Enable tuples{' '}
                    <Tag color="warning" className="ms-1">
                        experimental
                    </Tag>
                </Text>
            </label>
        </SettingsPopover>
    );
};

export default JsonToTypeScriptSettings;
