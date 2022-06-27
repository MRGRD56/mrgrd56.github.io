import React, { ChangeEventHandler, FunctionComponent } from 'react';
import { VariableValuesRaw } from '../../types/VariableValues';
import { Col, Input, Row } from 'antd';
import useInputState from '../../../../hooks/useInputState';

interface Props {
    value: VariableValuesRaw;
    onChange: (value: VariableValuesRaw) => void;
}

/** @deprecated */
const VariableValuesList: FunctionComponent<Props> = ({ value, onChange }) => {
    const [valuesJson, , setValuesJsonByEvent] = useInputState<string>(JSON.stringify(value.valuesJson));

    const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        onChange({
            ...value,
            name: event.target.value
        });
    };

    const handleValuesChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        onChange({
            ...value,
            valuesJson: event.target.value
        });
    };

    // useEffect(() => {
    //     try {
    //         const values = JSON.parse(valuesJson) as string[];
    //         handleValuesChange(values);
    //     } catch (error) {
    //         //console.error(error);
    //     }
    // }, [valuesJson, handleValuesChange]);

    return (
        <Col span={24}>
            <Row gutter={4}>
                <Col span={8}>
                    <Input placeholder="Name" value={value.name} onChange={handleNameChange} />
                </Col>
                <Col span={16}>
                    <Input placeholder="Values JSON array" value={value.valuesJson} onChange={handleValuesChange} />
                </Col>
                {/*<TagsInput values={value.values} onChange={handleValuesChange} />*/}
            </Row>
        </Col>
    );
};

export default VariableValuesList;
