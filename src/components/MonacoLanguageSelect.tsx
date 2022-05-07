import React, { FunctionComponent } from 'react';
import { monacoLanguages } from '../types/MonacoLanguage';
import { Select, SelectProps } from 'antd';

type Props = SelectProps;

const MonacoLanguageSelect: FunctionComponent<Props> = ({ children, ...props }) => {
    return (
        <Select {...props}>
            {monacoLanguages.map((language) => (
                <Select.Option key={language}>{language}</Select.Option>
            ))}
            {children}
        </Select>
    );
};

export default MonacoLanguageSelect;
