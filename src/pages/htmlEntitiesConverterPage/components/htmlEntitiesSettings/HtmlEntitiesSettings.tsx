import React from 'react';
import { OptionsPopoverComponent } from '../../../../layouts/pages/textBiConverterPageContainer/TextBiConverterPageContainer';
import HtmlEntitiesConversionOptions from '../../types';
import SettingsPopover from '../../../../components/settingsPopover/SettingsPopover';
import useChangeStateHandler from '../../../../hooks/useChangeStateHandler';
import styles from '../../../../components/settingsPopover/SettingsPopover.module.scss';
import { Select } from 'antd';

const HtmlEntitiesSettings: OptionsPopoverComponent<HtmlEntitiesConversionOptions> = ({
    options,
    onOptionsChange,
    onClose
}) => {
    const handleOptionChange = useChangeStateHandler(onOptionsChange);

    return (
        <SettingsPopover onClose={onClose}>
            <label className={styles.formItem}>
                <span className={styles.label}>Level</span>
                <Select className={styles.input} value={options.level} onChange={handleOptionChange('level')}>
                    <Select.Option key="all">All</Select.Option>
                    <Select.Option key="html5">HTML5</Select.Option>
                    <Select.Option key="html4">HTML4</Select.Option>
                    <Select.Option key="xml">XML</Select.Option>
                </Select>
            </label>
            <label className={styles.formItem}>
                <span className={styles.label}>Mode</span>
                <Select className={styles.input} value={options.mode} onChange={handleOptionChange('mode')}>
                    <Select.Option key="specialChars">Special chars</Select.Option>
                    <Select.Option key="nonAscii">Non-ASCII</Select.Option>
                    <Select.Option key="nonAsciiPrintable">Non-ASCII printable</Select.Option>
                    <Select.Option key="extensive">Extensive</Select.Option>
                </Select>
            </label>
            <label className={styles.formItem}>
                <span className={styles.label}>Numeric</span>
                <Select className={styles.input} value={options.numeric} onChange={handleOptionChange('numeric')}>
                    <Select.Option key="decimal">Decimal</Select.Option>
                    <Select.Option key="hexadecimal">Hexadecimal</Select.Option>
                </Select>
            </label>
            <label className={styles.formItem}>
                <span className={styles.label}>Scope</span>
                <Select className={styles.input} value={options.scope} onChange={handleOptionChange('scope')}>
                    <Select.Option key="body">Body</Select.Option>
                    <Select.Option key="attribute">Attribute</Select.Option>
                    <Select.Option key="strict">Strict</Select.Option>
                </Select>
            </label>
        </SettingsPopover>
    );
};

export default HtmlEntitiesSettings;
