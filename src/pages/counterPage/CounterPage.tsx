import React, { FunctionComponent, useCallback } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import getLocalStorageKey from '../../utils/getLocalStorageKey';
import useArrayStateMutator from '../../hooks/useArrayStateMutator';
import { Counter } from './types';
import CounterItem from './components/counterItem/CounterItem';
import { Button, Modal } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import Flex from '../../components/flex/Flex';
import useWriteableLocalstorageState from '../../hooks/useWriteableLocalstorageState';

const createCounter = (name = '', count = 0): Counter => ({
    name: '',
    count: 0
});

const initialCounters: Counter[] = [createCounter('Count')];

const CounterPage: FunctionComponent = () => {
    const [counters, setCounters] = useWriteableLocalstorageState<Counter[]>(
        getLocalStorageKey('counter', 'counters'),
        initialCounters
    );
    const {
        fpChangeByIndex: handleItemChange,
        fpRemoveByIndex: handleItemRemove,
        add: addItem,
        clear: clearItems
    } = useArrayStateMutator(setCounters);

    const handleAddItem = useCallback(() => {
        addItem(createCounter());
    }, [addItem]);

    const handleClear = useCallback(() => {
        Modal.warn({
            title: 'Clear counters',
            content: 'Are you sure you want to delete all counters?',
            onOk: clearItems,
            okCancel: true
        });
    }, [clearItems]);

    return (
        <PageContainer title="Counters">
            <Flex column gap={8}>
                {counters.length > 0 && (
                    <>
                        <Flex column>
                            <Button icon={<CloseOutlined />} size="large" onClick={handleClear}>
                                Clear counters list
                            </Button>
                        </Flex>
                        <Flex column gap={8}>
                            {counters.map((counter, index) => (
                                <CounterItem
                                    key={index}
                                    counter={counter}
                                    onChange={handleItemChange(index)}
                                    onRemove={handleItemRemove(index)}
                                />
                            ))}
                        </Flex>
                    </>
                )}
                <Button icon={<PlusOutlined />} type="dashed" onClick={handleAddItem} size="large">
                    Add counter
                </Button>
            </Flex>
        </PageContainer>
    );
};

export default CounterPage;
