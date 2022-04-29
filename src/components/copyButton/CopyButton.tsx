import React, { MouseEvent, MouseEventHandler, useRef, useState } from 'react';
import copyText from '../../utils/copyText';
import { Button, ButtonProps, Space } from 'antd';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { isNil, isString } from 'lodash';
import copyBlob from '../../utils/copyBlob';

type ContentType = string | Blob | null | undefined;

interface Props<T extends ContentType> extends Omit<ButtonProps, 'value'> {
    value: T;
    copyEmpty?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => T;
}

function CopyButton<T extends ContentType>({ value, copyEmpty, children, onClick, ...props }: Props<T>) {
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const copiedTimeoutRef = useRef<NodeJS.Timeout>();

    const handleClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
        const replacedValue = onClick?.(event);

        const actualValue = replacedValue ?? value;

        if (!actualValue && !copyEmpty) {
            return;
        }

        if (copiedTimeoutRef.current) {
            clearTimeout(copiedTimeoutRef.current);
        }

        if (isNil(actualValue) || isString(actualValue)) {
            await copyText(actualValue ?? '');
        }
        if (actualValue instanceof Blob) {
            await copyBlob(actualValue);
        }

        setIsCopied(true);
        copiedTimeoutRef.current = setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    return (
        <Button onClick={handleClick} {...props}>
            <Space align="center">
                {isCopied ? <CheckOutlined /> : <CopyOutlined />}
                {children ?? 'Copy'}
            </Space>
        </Button>
    );
}

export default CopyButton;
