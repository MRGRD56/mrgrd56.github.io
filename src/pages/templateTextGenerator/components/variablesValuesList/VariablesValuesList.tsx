import React, { FunctionComponent, useCallback } from 'react';
import VariableValues from '../../types/VariableValues';
import { Button, Row, Space } from 'antd';
import VariableValuesList from './VariableValuesList';

interface Props {
    values: VariableValues[];
    onChange: (values: VariableValues[]) => void;
}

const VariablesValuesList: FunctionComponent<Props> = ({ values, onChange }) => {
    const handleAddClick = () => {
        onChange([
            ...values,
            {
                name: '',
                values: []
            }
        ]);
    };

    const handleChange = useCallback(
        (index: number) => (value: VariableValues) => {
            onChange(values.map((v, i) => (i === index ? value : v)));
        },
        [onChange, values]
    );

    return (
        <Space direction="vertical">
            {values.map((value, index) => (
                <Row>
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
