import React, { FunctionComponent, useState } from 'react';
import PageContainer, { PageTag } from '../../layouts/pages/pageContainer/PageContainer';
import { Button, Col, Row, Space } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import styles from './TemplateTextGeneratorPage.module.scss';
import { getVariableValues, VariableValuesRaw } from './types/VariableValues';
import VariablesValuesList from './components/variablesValuesList/VariablesValuesList';
import useInputState from '../../hooks/useInputState';

const TemplateTextGeneratorPage: FunctionComponent = () => {
    const [template, , setTemplateByEvent] = useInputState<string>('');
    const [resultSeparator, , setResultSeparatorByEvent] = useInputState<string>('\n');
    const [variablesValuesRaw, setVariablesValuesRaw] = useState<VariableValuesRaw[]>([]);
    const [result, setResult] = useState<string>('');

    const handleLogState = () => {
        console.log({ template, resultSeparator, variablesValuesRaw });
    };

    const handleGenerate = () => {
        const result = '';

        const variablesValues = variablesValuesRaw.map(getVariableValues);
        const resultsCount = variablesValues.reduce((result, value) => {
            const count = value.values.length;
            if (!count) {
                return result;
            }

            return result ? result * count : result;
        }, 0);

        for (let i = 0; i < resultsCount; i++) {
            for (const variable of variablesValues) {
                const { name, values } = variable;

                for (const value of values) {
                    console.log({ name, value });
                }
            }
        }

        setResult(result);
    };

    return (
        <PageContainer
            title="Text by Template Generator"
            description={<>Generates text (including source code) from a template</>}
            tags={[PageTag.WIP, PageTag.NOT_WORKING]}
        >
            <Col xs={24} lg={18} xl={12}>
                <Row>
                    <label className="w-100">
                        <h4>Template:</h4>
                        <TextArea rows={6} className={styles.code} value={template} onChange={setTemplateByEvent} />
                    </label>
                </Row>
                <Col className="mt-2" span={24}>
                    <Row>
                        <h4>Variables:</h4>
                    </Row>
                    <Row>
                        <VariablesValuesList values={variablesValuesRaw} onChange={setVariablesValuesRaw} />
                    </Row>
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
