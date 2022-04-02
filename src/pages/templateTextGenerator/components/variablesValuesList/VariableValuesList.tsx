import React, { ChangeEventHandler, FunctionComponent } from 'react';
import VariableValues from '../../types/VariableValues';
import { Input, Row, Space } from 'antd';
import TagsInput from '../../../../components/tagsInput/TagsInput';

interface Props {
    value: VariableValues;
    onChange: (value: VariableValues) => void;
}

const VariableValuesList: FunctionComponent<Props> = ({ value, onChange }) => {
    const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        onChange({
            ...value,
            name: event.target.value
        });
    };

    const handleValuesChange = (values: string[]) => {
        onChange({
            ...value,
            values
        });
    };

    return (
        <Row>
            <Space direction="horizontal" align="center">
                <Input placeholder="Name" value={value.name} onChange={handleNameChange} />
                <TagsInput values={value.values} onChange={handleValuesChange} />
            </Space>
        </Row>
    );
};

export default VariableValuesList;
