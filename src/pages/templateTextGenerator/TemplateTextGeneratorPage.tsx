import React, { FunctionComponent, useState } from 'react';
import PageContainer from '../../components/pageHeader/PageContainer';
import { Button, Col, Row, Space } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import styles from './TemplateTextGeneratorPage.module.scss';
import VariableValues from './types/VariableValues';
import VariablesValuesList from './components/variablesValuesList/VariablesValuesList';
import useInputState from '../../hooks/useInputState';
import Mustache from 'mustache';

const TemplateTextGeneratorPage: FunctionComponent = () => {
    const [template, , setTemplateByEvent] = useInputState<string>('');
    const [variablesValues, setVariablesValues] = useState<VariableValues[]>([]);
    const [result, setResult] = useState<string>('');

    const handleLogState = () => {
        console.log({ template, variablesValues });
    };

    const handleGenerate = () => {
        const result = Mustache.render(template, {
            [variablesValues[0].name]: variablesValues[0].values[0]
        });

        setResult(result);
    };

    return (
        <PageContainer
            title="Text by Template Generator"
            description={<>Generates text (including source code) from a template</>}
            wip
        >
            <Col xs={24} lg={18} xl={12}>
                <Row>
                    <label className="w-100">
                        <h4>Template:</h4>
                        <TextArea rows={6} className={styles.code} value={template} onChange={setTemplateByEvent} />
                    </label>
                </Row>
                <Col className="mt-2">
                    <h4>Variables:</h4>
                    <VariablesValuesList values={variablesValues} onChange={setVariablesValues} />
                </Col>
                <Space className="mt-3" direction="horizontal">
                    <Button type="primary" onClick={handleGenerate}>
                        Generate
                    </Button>
                    <Button type="default" onClick={handleLogState}>
                        Log state
                    </Button>
                </Space>
                <TextArea className="mt-3" readOnly rows={6} value={result} placeholder="Result" />
            </Col>
        </PageContainer>
    );
};

export default TemplateTextGeneratorPage;
