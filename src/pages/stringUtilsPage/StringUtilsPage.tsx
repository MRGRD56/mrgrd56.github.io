import React, { useState } from 'react';
import PageContainer from '../../components/pageHeader/PageContainer';
import { Button, Col, notification } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import useInputState from '../../hooks/useInputState';
import pluralize from 'pluralize';
import scopedEval from '../../utils/scopedEval';
import getErrorMessage from '../../utils/getErrorMessage';

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

    const evaluateJs = () => {
        if (!evalValue) {
            return;
        }

        try {
            const evalResult = scopedEval(evalValue, {
                $value: value,
                $easterEgg: '🥚'
            });
            setEvaluatedJs(String(evalResult));
        } catch (error) {
            notification.error({
                message: getErrorMessage(error)
            });
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
                        Evaluate JavaScript (<code className="code">$value</code> is the string)
                        <TextArea className="font-monospace mt-1" value={evalValue} onChange={setEvalValueByEvent} />
                    </label>
                    <Button className="mt-1 mb-2" type="primary" onClick={evaluateJs}>
                        Evaluate
                    </Button>
                    <TextArea className="font-monospace" readOnly value={evaluatedJs} />
                </Col>
            </Col>
        </PageContainer>
    );
};

export default StringUtilsPage;
