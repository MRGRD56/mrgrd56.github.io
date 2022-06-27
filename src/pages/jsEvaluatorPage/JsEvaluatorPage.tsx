import React, { useState } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
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
import styles from './JsEvaluatorPage.module.scss';
import OutputMode from './types/OutputMode';
import CopyButton from '../../components/copyButton/CopyButton';
import { BeforeMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import classNames from 'classnames';
import AppEditor from '../../components/appEditor/AppEditor';
import monacoExtraLibs from '../../utils/monaco/monacoExtraLibs';
import moment from 'moment';
import NpmLink from '../../components/NpmLink';

interface ShowCountProps {
    formatter: (args: { count: number; maxLength?: number }) => string;
}

const textAreaShowCount: ShowCountProps = {
    formatter: ({ count }) => pluralize('character', count, true)
};

const codeEditorOptions: editor.IStandaloneEditorConstructionOptions = {
    fontFamily: 'JetBrains Mono',
    minimap: { enabled: false }
};

const handleCodeEditorBeforeMount: BeforeMount = (monaco) => {
    monaco.languages.typescript.javascriptDefaults.addExtraLib(`
declare const $value: string;`);
    monacoExtraLibs.lodash(monaco);
    monacoExtraLibs.axios(monaco);
    monacoExtraLibs.pluralize(monaco);
    monacoExtraLibs.moment(monaco);
};

const JsEvaluatorPage = () => {
    const [value, , setValueByEvent] = useInputState<string>('');
    const [evalValue, setEvalValue] = useState<string>('');
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
                moment,
                $easterEgg: '🥚'
            });

            if (outputMode === OutputMode.CONSOLE) {
                console.log(evalResult);
            }

            const evalResultString = isObjectLike(evalResult)
                ? JSON.stringify(evalResult, undefined, 2)
                : String(evalResult);

            setEvaluatedJs(evalResultString);
        } catch (error) {
            notification.error({
                message: getErrorMessage(error)
            });

            if (outputMode === OutputMode.CONSOLE) {
                console.error(error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageContainer title="JavaScript Evaluator" className={styles.container}>
            <Col>
                <TextArea
                    rows={6}
                    allowClear
                    showCount={textAreaShowCount}
                    value={value}
                    onChange={setValueByEvent}
                    className={classNames('mb-3', styles.textarea)}
                    placeholder="$value"
                    id="$value-textarea"
                />
                <Col>
                    <Col>
                        <Text>
                            <Paragraph className="mb-1">Evaluate JavaScript</Paragraph>
                            <Paragraph className="mb-2">
                                Available variables:{' '}
                                <Tooltip title="The string above">
                                    <label htmlFor="$value-textarea">
                                        <code>$value</code>
                                    </label>
                                </Tooltip>
                                , <NpmLink packageName="lodash">_</NpmLink>, <NpmLink packageName="axios" />,{' '}
                                <NpmLink packageName="pluralize" />, <NpmLink packageName="moment" />
                            </Paragraph>
                        </Text>

                        {/*<TextArea className="font-monospace mt-1" value={evalValue} onChange={setEvalValueByEvent} />*/}
                        <AppEditor
                            defaultLanguage="javascript"
                            className={classNames('mt-1', styles.codeEditor)}
                            value={evalValue}
                            onChange={setEvalValue}
                            options={codeEditorOptions}
                            height="400px"
                            width="100%"
                            beforeMount={handleCodeEditorBeforeMount}
                        />
                    </Col>
                    <Row className="mt-1 mb-2 d-flex justify-content-between">
                        <Button type="primary" onClick={evaluateJs}>
                            Evaluate
                        </Button>
                        <Select className={styles.outputModeComboBox} value={outputMode} onChange={setOutputMode}>
                            <Select.Option key={OutputMode.TEXT}>Text</Select.Option>
                            <Select.Option key={OutputMode.HTML}>HTML</Select.Option>
                            <Select.Option key={OutputMode.TABLE}>Table</Select.Option>
                            <Select.Option key={OutputMode.CONSOLE}>Console</Select.Option>
                        </Select>
                    </Row>
                    <Spin spinning={isLoading} delay={10}>
                        {outputMode === OutputMode.TEXT && (
                            <Col>
                                <TextArea
                                    className={classNames('font-monospace mb-2', styles.textarea)}
                                    readOnly
                                    value={evaluatedJs}
                                    rows={6}
                                />
                                <CopyButton value={evaluatedJs} />
                            </Col>
                        )}
                        {outputMode === OutputMode.HTML && <div dangerouslySetInnerHTML={{ __html: evaluatedJs }} />}
                        {outputMode === OutputMode.TABLE && <Text type="secondary">Coming Soon</Text>}
                        {outputMode === OutputMode.CONSOLE && <div>The output is in your browser console</div>}
                    </Spin>
                </Col>
            </Col>
        </PageContainer>
    );
};

export default JsEvaluatorPage;
