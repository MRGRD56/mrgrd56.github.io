import React, { FunctionComponent, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import ValueRange, { valueRange } from '../../types/ValueRange';
import getLocalStorageKey from '../../utils/getLocalStorageKey';
import PageCol from '../../components/pageCol/PageCol';
import Flex from '../../components/flex/Flex';
import Text from 'antd/lib/typography/Text';
import { Button, InputNumber, Slider } from 'antd';
import useWriteableLocalstorageState from '../../hooks/useWriteableLocalstorageState';
import useChangeStateHandler from '../../hooks/useChangeStateHandler';
import styles from './NumberGuesserPage.module.scss';
import { MinusOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import produceState from '../../utils/produceState';

const NumberGuesserPage: FunctionComponent = () => {
    const [absoluteLimits, setAbsoluteLimits] = useWriteableLocalstorageState<ValueRange<number>>(
        getLocalStorageKey('number-guesser', 'absoluteLimits'),
        valueRange(0, 1000)
    );
    const handleAbsoluteLimitChange = useChangeStateHandler(setAbsoluteLimits);

    const [attempt, setAttempt] = useState<number>(1);
    const [currentLimits, setCurrentLimits] = useState<ValueRange<number | undefined>>(valueRange());
    const actualLimits = useMemo<ValueRange<number>>(() => {
        return valueRange(currentLimits.from ?? absoluteLimits.from, currentLimits.to ?? absoluteLimits.to);
    }, [currentLimits, absoluteLimits]);

    const possibleAnswer = useMemo<number>(() => {
        return Math.round((actualLimits.from + actualLimits.to) / 2);
    }, [actualLimits]);

    const actualLimitsSliderMarks = useMemo<Record<number, ReactNode>>(() => {
        return {
            [absoluteLimits.from]: absoluteLimits.from,
            [absoluteLimits.to]: absoluteLimits.to,
            [possibleAnswer]: <Text strong>{possibleAnswer}</Text>
        };
    }, [absoluteLimits, possibleAnswer]);

    const handleSliderValueChange = useCallback((value: [number, number]): void => {
        setCurrentLimits(valueRange(value));
    }, []);

    const resetCurrentLimits = useCallback(() => {
        setCurrentLimits(valueRange());
        setAttempt(1);
    }, []);

    const handleCorrectionLower = () => {
        setAttempt((attempts) => attempts + 1);
        produceState(setCurrentLimits, (currentLimits) => {
            currentLimits.to = Math.max(possibleAnswer - 1, actualLimits.from);
        });
    };

    const handleCorrectionHigher = () => {
        setAttempt((attempts) => attempts + 1);
        produceState(setCurrentLimits, (currentLimits) => {
            currentLimits.from = Math.min(possibleAnswer + 1, actualLimits.to);
        });
    };

    useEffect(() => {
        resetCurrentLimits();
    }, [absoluteLimits.from, absoluteLimits.to, resetCurrentLimits]);

    return (
        <PageContainer title="Number Guesser">
            <PageCol>
                <Flex row wrap="nowrap" gap={6} align="center">
                    <Text className="me-1">Limits: </Text>
                    <InputNumber
                        value={absoluteLimits.from}
                        onChange={handleAbsoluteLimitChange('from')}
                        max={absoluteLimits.to}
                    />
                    <Text>to</Text>
                    <InputNumber
                        value={absoluteLimits.to}
                        onChange={handleAbsoluteLimitChange('to')}
                        min={absoluteLimits.from}
                    />
                </Flex>
                <Slider
                    range
                    marks={actualLimitsSliderMarks}
                    min={absoluteLimits.from}
                    max={absoluteLimits.to}
                    value={[actualLimits.from, actualLimits.to]}
                    onChange={handleSliderValueChange}
                />
                <Text className="mb-1">
                    Range: {actualLimits.from} - {actualLimits.to}
                    <br />
                    Answer:
                    <br />
                    <Text className={styles.answer}>{possibleAnswer}</Text>
                </Text>
                <Flex row gap={6}>
                    <Button
                        icon={<MinusOutlined />}
                        size="large"
                        className={styles.answerCorrectionButton}
                        onClick={handleCorrectionLower}
                        disabled={possibleAnswer <= actualLimits.from}
                    >
                        Lower
                    </Button>
                    <Button
                        icon={<PlusOutlined />}
                        size="large"
                        className={styles.answerCorrectionButton}
                        onClick={handleCorrectionHigher}
                        disabled={possibleAnswer >= actualLimits.to}
                    >
                        Higher
                    </Button>
                </Flex>
                <Text className="mb-1">Attempt: {attempt}</Text>
                <Button
                    icon={<ReloadOutlined />}
                    size="small"
                    className="align-self-start"
                    type="dashed"
                    onClick={resetCurrentLimits}
                >
                    Reset
                </Button>
            </PageCol>
        </PageContainer>
    );
};

export default NumberGuesserPage;
