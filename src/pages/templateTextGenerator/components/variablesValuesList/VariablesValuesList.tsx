import React, { FunctionComponent, useCallback } from 'react';
import { VariableValuesRaw } from '../../types/VariableValues';
import { Button, Row, Space } from 'antd';
import VariableValuesList from './VariableValuesList';

interface Props {
    values: VariableValuesRaw[];
    onChange: (values: VariableValuesRaw[]) => void;
}

const VariablesValuesList: FunctionComponent<Props> = ({ values, onChange }) => {
    const handleAddClick = () => {
        onChange([
            ...values,
            {
                name: '',
                valuesJson: '[]'
            }
        ]);
    };

    const handleChange = useCallback(
        (index: number) => (value: VariableValuesRaw) => {
            onChange(values.map((v, i) => (i === index ? value : v)));
        },
        [onChange, values]
    );

    return (
        <Space direction="vertical" className="w-100">
            {values.map((value, index) => (
                <Row key={index}>
                    <VariableValuesList value={value} onChange={handleChange(index)} />
                </Row>
            ))}
            <Button type="dashed" onClick={handleAddClick}>
                Add
            </Button>
        </Space>
    );
};

export default VariablesValuesList;
