import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Counter } from '../../types';
import { Button, Input, Popover } from 'antd';
import { CloseOutlined, MinusOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import Flex from '../../../../components/flex/Flex';
import ButtonGroup from 'antd/lib/button/button-group';
import styles from './CounterItem.module.scss';
import classNames from 'classnames';

interface Props {
    counter: Counter;
    onChange: (newCounter: Counter) => void;
    onRemove: () => void;
}

const CounterItem: FunctionComponent<Props> = ({ counter, onChange, onRemove }) => {
    const [isPopoverVisible, setIsPopoverVisible] = useState<boolean>(false);

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...counter,
            name: event.target.value
        });
    };

    const handleCountIncrement = (increment: number) => () => {
        handleCountChange(counter.count + increment)();
    };

    const handleCountChange = (count: number) => () => {
        onChange({
            ...counter,
            count
        });
    };

    const handlePopoverClick = (callback: () => void) => () => {
        setIsPopoverVisible(false);
        callback();
    };

    return (
        <Flex row>
            <Input value={counter.name} onChange={handleNameChange} className={styles.input} />
            <ButtonGroup>
                <Popover
                    placement="bottomRight"
                    content={
                        <Flex column gap={8}>
                            <Button icon={<ReloadOutlined />} onClick={handlePopoverClick(handleCountChange(0))}>
                                Reset
                            </Button>
                            <Button icon={<CloseOutlined />} onClick={handlePopoverClick(onRemove)}>
                                Remove
                            </Button>
                        </Flex>
                    }
                    visible={isPopoverVisible}
                    onVisibleChange={setIsPopoverVisible}
                >
                    <Button size="large" className={classNames(styles.firstButton, styles.counter)}>
                        {counter.count}
                    </Button>
                </Popover>
                <Button icon={<MinusOutlined />} size="large" onClick={handleCountIncrement(-1)} />
                <Button icon={<PlusOutlined />} size="large" onClick={handleCountIncrement(1)} />
            </ButtonGroup>
        </Flex>
    );
};

export default CounterItem;
