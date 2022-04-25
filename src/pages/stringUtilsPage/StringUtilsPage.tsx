import React, { useState } from 'react';
import PageContainer from '../../components/pageContainer/PageContainer';
import { Button, Col, notification, Row, Select, Spin, Tooltip } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import useInputState from '../../hooks/useInputState';
import pluralize from 'pluralize';
import scopedEval from '../../utils/scopedEval';
import getErrorMessage from '../../utils/getErrorMessage';
import _, { isObjectLike } from 'lodash';
import axios from 'axios';
import Text from 'antd/lib/typography/Text';
import Paragraph from 'antd/lib/typography/Paragraph';
import ExternalLink from '../../components/ExternalLink';
import styles from './StringUtilsPage.module.scss';
import OutputMode from './types/OutputMode';
import CopyButton from '../../components/copyButton/CopyButton';

interface ShowCountProps {
    formatter: (args: { count: number; maxLength?: number }) => string;
}

const textAreaShowCount: ShowCountProps = {
    formatter: ({ count }) => pluralize('character', count, true)
};

const StringUtilsPage = () => {
    const [value, , setValueByEvent] = useInputState<string>('');
    const [evalValue, , setEvalValueByEvent] = useInputState<string>('');
    const [evaluatedJs, setEvaluatedJs] = useState<string>('');

    const [outputMode, setOutputMode] = useState<OutputMode>(OutputMode.TEXT);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const evaluateJs = async () => {
        if (!evalValue) {
            setEvaluatedJs('');
            return;
        }

        try {
            setIsLoading(true);

            const evalResult = await scopedEval(evalValue, {
                $value: value,
                _,
                axios,
                pluralize,
                $easterEgg: '🥚'
            });

            const evalResultString = isObjectLike(evalResult)
                ? JSON.stringify(evalResult, undefined, 2)
                : String(evalResult);

            setEvaluatedJs(evalResultString);
        } catch (error) {
            notification.error({
                message: getErrorMessage(error)
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageContainer title="String Utils">
            <Col>
                <TextArea
                    rows={6}
                    allowClear
                    showCount={textAreaShowCount}
                    value={value}
                    onChange={setValueByEvent}
                    className="mb-3"
                />
                <Col>
                    <label>
                        <Text>
                            <Paragraph className="mb-1">Evaluate JavaScript</Paragraph>
                            <Paragraph className="mb-2">
                                Available variables:{' '}
                                <Tooltip title="The string">
                                    <code>$value</code>
                                </Tooltip>
                                ,{' '}
                                <ExternalLink href="https://lodash.com/">
                                    <code>_</code>
                                </ExternalLink>
                                ,{' '}
                                <ExternalLink href="https://github.com/axios/axios">
                                    <code>axios</code>
                                </ExternalLink>
                                ,{' '}
                                <ExternalLink href="https://github.com/plurals/pluralize">
                                    <code>pluralize</code>
                                </ExternalLink>
                            </Paragraph>
                        </Text>

                        <TextArea className="font-monospace mt-1" value={evalValue} onChange={setEvalValueByEvent} />
                    </label>
                    <Row className="mt-1 mb-2 d-flex justify-content-between">
                        <Button type="primary" onClick={evaluateJs}>
                            Evaluate
                        </Button>
                        <Select className={styles.outputModeComboBox} value={outputMode} onChange={setOutputMode}>
                            <Select.Option key={OutputMode.TEXT}>Text</Select.Option>
                            <Select.Option key={OutputMode.HTML}>HTML</Select.Option>
                            <Select.Option key={OutputMode.TABLE}>Table</Select.Option>
                        </Select>
                    </Row>
                    <Spin spinning={isLoading} delay={10}>
                        {outputMode === OutputMode.TEXT && (
                            <Col>
                                <TextArea className="font-monospace mb-2" readOnly value={evaluatedJs} />
                                <CopyButton text={evaluatedJs} />
                            </Col>
                        )}
                        {outputMode === OutputMode.HTML && <div dangerouslySetInnerHTML={{ __html: evaluatedJs }} />}
                        {outputMode === OutputMode.TABLE && <Text type="secondary">Coming Soon</Text>}
                    </Spin>
                </Col>
            </Col>
        </PageContainer>
    );
};

export default StringUtilsPage;
