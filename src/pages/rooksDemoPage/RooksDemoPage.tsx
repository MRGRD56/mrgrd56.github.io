import React, { ChangeEvent, EventHandler, FunctionComponent, useCallback, useEffect, useState } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import NpmLink from '../../components/NpmLink';
import { Button, Col, Input, Space } from 'antd';
import RooksHookHeading from './components/RooksHookHeading';
import {
    useCounter,
    useDebounce,
    useDidMount,
    useInput,
    useIntervalWhen,
    useLocalstorageState,
    useSessionstorageState,
    useToggle,
    useWillUnmount
} from 'rooks';
import delay from '../../utils/delay';
import Flex from '../../components/flex/Flex';
import { MinusOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import getLocalStorageKey from '../../utils/getLocalStorageKey';
import TextArea from 'antd/lib/input/TextArea';
import searchWords from './data/words.json';
import { isEmpty } from 'lodash';
import pluralize from 'pluralize';

interface StorageState {
    text: string;
}

const initialStorageState: StorageState = {
    text: 'Initial text'
};

const titleExtra = (
    <NpmLink packageName="rooks" plain>
        npm package
    </NpmLink>
);

const RooksDemoPage: FunctionComponent = () => {
    const [didMountValue, setDidMountValue] = useState<string>('not mounted');

    //! useInput
    const debounceInput = useInput('');
    const [debounceResults, setDebounceResults] = useState<string[]>(searchWords);

    //! useCounter
    const {
        value: timeoutCounter,
        increment: incrementTimeoutCounter,
        decrement: decrementTimeoutCounter,
        reset: resetTimeoutCounter
    } = useCounter(0);

    //! useToggle
    const [isIntervalEnabled, toggleIntervalEnabled] = useToggle(true);

    //! useLocalstorageState
    const [localStorageState, setLocalStorageState] = useLocalstorageState<StorageState>(
        getLocalStorageKey('rooks-demo', 'localStorageState'),
        initialStorageState
    );
    //! useSessionstorageState
    const [sessionStorageState, setSessionStorageState] = useSessionstorageState<StorageState>(
        getLocalStorageKey('rooks-demo', 'sessionStorageState'),
        initialStorageState
    );

    //! useDidMount
    useDidMount(async () => {
        await delay(1000);
        setDidMountValue('mounted 1s ago');
    });

    //! useWillUnmount
    useWillUnmount(async () => {
        await delay(10);
        setDidMountValue('unmounted 0.01s ago');
    });

    const timeoutCallback = useCallback(() => {
        incrementTimeoutCounter();
    }, []);

    //! useIntervalWhen
    useIntervalWhen(timeoutCallback, 500, isIntervalEnabled);

    const handleLocalStorageTextChange = useCallback<EventHandler<ChangeEvent<HTMLTextAreaElement>>>((event) => {
        setLocalStorageState({
            ...localStorageState,
            text: event.target.value
        });
    }, []);

    const handleSessionStorageTextChange = useCallback<EventHandler<ChangeEvent<HTMLTextAreaElement>>>((event) => {
        setSessionStorageState({
            ...sessionStorageState,
            text: event.target.value
        });
    }, []);

    const handleEveryDebounceInputChange = useCallback((searchQuery: string) => {
        setDebounceResults(
            searchWords.filter((word) => {
                if (isEmpty(searchQuery)) {
                    return true;
                }

                return word.trim().toLocaleLowerCase().includes(searchQuery.trim().toLocaleLowerCase());
            })
        );
    }, []);

    const handleDebounceInputChange = useDebounce(handleEveryDebounceInputChange, 500);

    useEffect(() => handleDebounceInputChange(debounceInput.value), [debounceInput.value]);

    return (
        <PageContainer title="Rooks demo" titleExtra={titleExtra}>
            <Space direction="vertical" size="middle">
                <Col>
                    <RooksHookHeading hooks={['useDidMount', 'useWillUnmount']} />
                    {didMountValue}
                </Col>
                <Col>
                    <RooksHookHeading hooks={['useIntervalWhen', 'useCounter', 'useToggle']} />
                    <Flex column gap={6}>
                        <Flex row gap={6}>
                            <Button onClick={toggleIntervalEnabled}>
                                <Text type={isIntervalEnabled ? 'success' : 'danger'}>
                                    {isIntervalEnabled ? 'Interval enabled' : 'Interval disabled'}
                                </Text>
                            </Button>
                        </Flex>
                        <Flex row gap={6} align="center">
                            <Button icon={<PlusOutlined />} size="small" onClick={incrementTimeoutCounter} />
                            <Button icon={<MinusOutlined />} size="small" onClick={decrementTimeoutCounter} />
                            <Button icon={<ReloadOutlined />} size="small" onClick={resetTimeoutCounter} />
                            <h3 className="m-0">{timeoutCounter}</h3>
                        </Flex>
                    </Flex>
                </Col>
                <Col>
                    <RooksHookHeading hooks={['useLocalstorageState']} />
                    <TextArea value={localStorageState.text} onChange={handleLocalStorageTextChange} />
                </Col>
                <Col>
                    <RooksHookHeading hooks={['useSessionstorageState']} />
                    <TextArea value={sessionStorageState.text} onChange={handleSessionStorageTextChange} />
                </Col>
                <Col>
                    <RooksHookHeading hooks={['useDebounce', 'useInput']} />
                    <Flex column gap={6}>
                        <Input {...debounceInput} placeholder="Search..." />
                        <TextArea
                            readOnly
                            placeholder="Results"
                            rows={4}
                            value={debounceResults.join('\n')}
                            showCount={{ formatter: () => pluralize('result', debounceResults.length, true) }}
                        />
                    </Flex>
                </Col>
            </Space>
        </PageContainer>
    );
};

export default RooksDemoPage;
