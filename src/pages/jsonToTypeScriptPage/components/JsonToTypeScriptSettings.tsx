import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import JsonToTypeScriptConversionSelectableOptions, {
    NameTransformer
} from '../types/JsonToTypeScriptConversionSelectableOptions';
import { Button, Col, Input, Select, Switch } from 'antd';
import useChangeStateHandler from '../../../hooks/useChangeStateHandler';
import styles from './JsonToTypeScriptSettings.module.scss';
import ExportType from '../types/ExportType';
import Text from 'antd/lib/typography/Text';
import classNames from 'classnames';
import { CloseOutlined } from '@ant-design/icons';

interface Props {
    options: JsonToTypeScriptConversionSelectableOptions;
    setOptions: Dispatch<SetStateAction<JsonToTypeScriptConversionSelectableOptions>>;
    onClose?: () => void;
}

const JsonToTypeScriptSettings: FunctionComponent<Props> = ({ options, setOptions, onClose }) => {
    const handleOptionChange = useChangeStateHandler(setOptions);

    return (
        <Col className={styles.formContainer}>
            <div className={styles.title}>
                <h3 className="mb-0">Settings</h3>
                {onClose && (
                    <Button
                        size="small"
                        type="text"
                        icon={<CloseOutlined />}
                        className={styles.closeButton}
                        onClick={onClose}
                    />
                )}
            </div>
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
            <label className={classNames('mt-1', styles.formItem)}>
                <Switch checked={options.isReversedOrder} onChange={handleOptionChange('isReversedOrder')} />
                <span className="ms-3">Reverse declarations</span>
            </label>
        </Col>
    );
};

export default JsonToTypeScriptSettings;
