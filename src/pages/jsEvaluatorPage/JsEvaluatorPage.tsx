import React, { useCallback, useEffect, useState } from 'react';
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
import Flex from '../../components/flex/Flex';
import LabeledSwitch from '../../components/labeledSwitch/LabeledSwitch';
import { useDebounce, useLocalstorageState } from 'rooks';
import getLocalStorageKey from '../../utils/getLocalStorageKey';
import JsObjectViewer from '../../components/jsObjectViewer/JsObjectViewer';

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
    const [$value, , set$ValueByEvent] = useInputState<string>('');
    const [evalValue, setEvalValue] = useState<string>('');
    const [evaluatedJs, setEvaluatedJs] = useState<unknown>(undefined);
    const [evaluatedJsString, setEvaluatedJsString] = useState<string>('');
    const [isAutoEval, setIsAutoEval] = useLocalstorageState<boolean>(
        getLocalStorageKey('javascript-eval', 'isAutoEval'),
        true
    );

    const [outputMode, setOutputMode] = useLocalstorageState<OutputMode>(
        getLocalStorageKey('javascript-eval', 'outputMode'),
        OutputMode.TEXT
    );

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const evaluateJsDangerous = useCallback(async (evalValue: string, $value: string) => {
        if (!evalValue) {
            setEvaluatedJs(undefined);
            setEvaluatedJsString('');
            return;
        }

        setIsLoading(true);

        const evalResult = await scopedEval(evalValue, {
            $value,
            _,
            axios,
            pluralize,
            moment,
            $easterEgg: '🥚'
        });

        if (outputMode === OutputMode.CONSOLE) {
            console.log(evalResult);
        }

        setEvaluatedJs(evalResult);

        const evalResultString = isObjectLike(evalResult)
            ? JSON.stringify(evalResult, undefined, 2)
            : String(evalResult);

        setEvaluatedJsString(evalResultString);
    }, []);

    const handleJsError = useCallback((error: unknown) => {
        notification.error({
            message: getErrorMessage(error)
        });

        if (outputMode === OutputMode.CONSOLE) {
            console.error(error);
        }
    }, []);

    const evaluateJs = useCallback(async () => {
        try {
            await evaluateJsDangerous(evalValue, $value);
        } catch (error) {
            handleJsError(error);
        } finally {
            setIsLoading(false);
        }
    }, [evaluateJsDangerous, handleJsError, evalValue, $value]);

    const handleEveryEvalValueChange = useCallback(async (evalValue: string, $value: string) => {
        try {
            await evaluateJsDangerous(evalValue, $value);
        } catch (error) {
            if (!(error instanceof ReferenceError || error instanceof SyntaxError || error instanceof TypeError)) {
                handleJsError(error);
            }

            // ignored
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleEvalValueChange = useDebounce(handleEveryEvalValueChange, 300);

    useEffect(() => {
        handleEvalValueChange(evalValue, $value);
    }, [evalValue, $value]);

    return (
        <PageContainer title="JavaScript Evaluator" className={styles.container}>
            <Flex column gap={8} minHeight="100%" maxHeight="100%">
                <Col className={styles.valueContainer}>
                    <TextArea
                        rows={6}
                        allowClear
                        showCount={textAreaShowCount}
                        value={$value}
                        onChange={set$ValueByEvent}
                        className={classNames('mb-3', styles.textarea)}
                        placeholder="$value"
                        id="$value-textarea"
                    />
                </Col>
                <Flex column className={styles.codeContainer}>
                    <Flex column flex={1} className={styles.codeEditorContainer}>
                        <Text>
                            <Paragraph className="mb-1">Evaluate JavaScript</Paragraph>
                            <Paragraph className="mb-2">
                                Available variables:{' '}
                                <Tooltip title="The string above">
                                    <label htmlFor="$value-textarea">
                                        <code>$value</code>
                                    </label>
                                </Tooltip>
                                {', '}
                                <NpmLink packageName="lodash">_</NpmLink>
                                {', '}
                                <NpmLink packageName="axios" />
                                {', '}
                                <NpmLink packageName="pluralize" />
                                {', '}
                                <NpmLink packageName="moment" />
                            </Paragraph>
                        </Text>

                        {/*<TextArea className="font-monospace mt-1" $value={evalValue} onChange={setEvalValueByEvent} />*/}
                        <AppEditor
                            defaultLanguage="javascript"
                            className={classNames('mt-1', styles.codeEditor)}
                            value={evalValue}
                            onChange={setEvalValue}
                            options={codeEditorOptions}
                            beforeMount={handleCodeEditorBeforeMount}
                        />
                    </Flex>
                    <Row className="mt-1 mb-2 d-flex justify-content-between">
                        <Flex row gap={10} align="center">
                            <Button type="primary" onClick={evaluateJs}>
                                Evaluate
                            </Button>
                            <LabeledSwitch checked={isAutoEval} onChange={setIsAutoEval}>
                                Auto
                            </LabeledSwitch>
                        </Flex>
                        <Select className={styles.outputModeComboBox} value={outputMode} onChange={setOutputMode}>
                            <Select.Option key={OutputMode.VIEW}>View</Select.Option>
                            <Select.Option key={OutputMode.TEXT}>Text</Select.Option>
                            <Select.Option key={OutputMode.HTML}>HTML</Select.Option>
                            <Select.Option key={OutputMode.TABLE}>Table</Select.Option>
                            <Select.Option key={OutputMode.CONSOLE}>Console</Select.Option>
                        </Select>
                    </Row>
                </Flex>
                <Flex column className={styles.resultContainerWrapper}>
                    <Spin spinning={isLoading} delay={10} className={styles.resultContainer}>
                        {outputMode === OutputMode.VIEW && <JsObjectViewer value={evaluatedJs} />}
                        {outputMode === OutputMode.TEXT && (
                            <Col>
                                <TextArea
                                    className={classNames('font-monospace mb-2', styles.textarea)}
                                    readOnly
                                    value={evaluatedJsString}
                                    rows={6}
                                />
                                <CopyButton value={evaluatedJsString} />
                            </Col>
                        )}
                        {outputMode === OutputMode.HTML && (
                            <div dangerouslySetInnerHTML={{ __html: evaluatedJsString }} />
                        )}
                        {outputMode === OutputMode.TABLE && <Text type="secondary">Coming Soon</Text>}
                        {outputMode === OutputMode.CONSOLE && <div>The output is in your browser console</div>}
                    </Spin>
                </Flex>
            </Flex>
        </PageContainer>
    );
};

export default JsEvaluatorPage;
