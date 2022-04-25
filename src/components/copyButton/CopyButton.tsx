import React, { FunctionComponent, MouseEvent, MouseEventHandler, useRef, useState } from 'react';
import copyText from '../../utils/copyText';
import { Button, ButtonProps, Space } from 'antd';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';

interface Props extends ButtonProps {
    text: string | null | undefined;
    copyEmpty?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => string | undefined;
}

const CopyButton: FunctionComponent<Props> = ({ text, copyEmpty, children, onClick, ...props }) => {
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const copiedTimeoutRef = useRef<NodeJS.Timeout>();

    const handleClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
        const replacedText = onClick?.(event);

        const actualText = replacedText ?? text;

        if (!actualText && !copyEmpty) {
            return;
        }

        if (copiedTimeoutRef.current) {
            clearTimeout(copiedTimeoutRef.current);
        }

        await copyText(actualText ?? '');
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
};

export default CopyButton;
