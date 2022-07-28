import React, { FunctionComponent, useCallback, useState } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import { Button, Checkbox, Col, notification, Row, Slider, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import CopyButton from '../../components/copyButton/CopyButton';
import ExternalLink from '../../components/ExternalLink';
import getNpmPackageLink from '../../utils/getNpmPackageLink';
import { useDebounce, useDidMount, useLocalstorageState } from 'rooks';
import getLocalStorageKey from '../../utils/getLocalStorageKey';
import PasswordGenerator, { GenerateOptions } from 'generate-password-browser';
import useChangeStateHandler from '../../hooks/useChangeStateHandler';
import Flex from '../../components/flex/Flex';
import pluralize from 'pluralize';
import { SliderMarks } from 'antd/lib/slider';
import getErrorMessage from '../../utils/getErrorMessage';
import useDeepEffect from '../../hooks/useDeepEffect';

const titleExtra = (
    <Text type="secondary">
        uses{' '}
        <ExternalLink href={getNpmPackageLink('generate-password-browser')}>generate-password-browser</ExternalLink>
    </Text>
);

const initialOptions: GenerateOptions = {
    length: 8,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true
};

const lengthSliderMarks: SliderMarks = {
    [8]: '8',
    [16]: '16',
    [32]: '32',
    [64]: '64'
};

const generatePassword = (options: GenerateOptions) => {
    try {
        return PasswordGenerator.generate(options);
    } catch (e) {
        const message = getErrorMessage(e);
        notification.error({
            message: 'An error occurred',
            description: message
        });
    }
};

const PasswordGeneratorPage: FunctionComponent = () => {
    const [options, setOptions] = useLocalstorageState<GenerateOptions>(
        getLocalStorageKey('password-generator', 'options'),
        initialOptions
    );
    const handleOptionChange = useChangeStateHandler(setOptions);
    const handleOptionCheck = useChangeStateHandler(setOptions, 'checked');

    const [password, setPassword] = useState(generatePassword(options));

    const generateManually = useCallback((options: GenerateOptions) => {
        const newPassword = generatePassword(options);
        setPassword(newPassword);
        return newPassword;
    }, []);

    const generate = useCallback(() => {
        return generateManually(options);
    }, [generateManually, options]);

    const generateDebounced = useDebounce(generateManually, 25);

    useDidMount(() => {
        generate();
    });

    useDeepEffect(
        () => {
            generateDebounced(options);
        },
        [options],
        { skipFirstRender: true }
    );

    return (
        <PageContainer title="Password Generator" titleExtra={titleExtra}>
            <Col>
                <Row>
                    <Space className="mb-2">
                        <Text copyable className="fs-6">
                            {password}
                        </Text>
                    </Space>
                </Row>
                <Space className="mb-3">
                    <Button onClick={generate}>Generate</Button>
                    <CopyButton value={password} onClick={generate}>
                        Generate and copy
                    </CopyButton>
                </Space>
                <Flex col>
                    <Text className="text-wrap word-break">{pluralize('character', options.length, true)}</Text>
                    <Slider value={options.length} onChange={handleOptionChange('length')} marks={lengthSliderMarks} />
                    <Checkbox checked={options.lowercase} onChange={handleOptionCheck('lowercase')}>
                        Lowercase
                    </Checkbox>
                    <span />
                    <Checkbox checked={options.uppercase} onChange={handleOptionCheck('uppercase')}>
                        Uppercase
                    </Checkbox>
                    <span />
                    <Checkbox checked={options.numbers} onChange={handleOptionCheck('numbers')}>
                        Numbers
                    </Checkbox>
                    <span />
                    <Checkbox checked={Boolean(options.symbols)} onChange={handleOptionCheck('symbols')}>
                        Symbols
                    </Checkbox>
                    <span />
                    <Checkbox checked={Boolean(options.strict)} onChange={handleOptionCheck('strict')}>
                        Strict
                    </Checkbox>
                    <span />
                    <Checkbox
                        checked={Boolean(options.excludeSimilarCharacters)}
                        onChange={handleOptionCheck('excludeSimilarCharacters')}
                    >
                        Exclude similar characters
                    </Checkbox>
                </Flex>
            </Col>
        </PageContainer>
    );
};

export default PasswordGeneratorPage;
