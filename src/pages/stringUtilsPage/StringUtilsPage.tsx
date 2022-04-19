import React, { useState } from 'react';
import PageContainer from '../../components/pageContainer/PageContainer';
import { Button, Col, notification, Spin, Tooltip } from 'antd';
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
                    <Button className="mt-1 mb-2" type="primary" onClick={evaluateJs}>
                        Evaluate
                    </Button>
                    <Spin spinning={isLoading} delay={10}>
                        <TextArea className="font-monospace" readOnly value={evaluatedJs} />
                    </Spin>
                </Col>
            </Col>
        </PageContainer>
    );
};

export default StringUtilsPage;
