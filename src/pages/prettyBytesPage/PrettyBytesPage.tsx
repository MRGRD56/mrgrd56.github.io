import React, { FunctionComponent, useMemo, useState } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import styles from './PrettyBytesPage.module.scss';
import PageCol from '../../components/pageCol/PageCol';
import { Input } from 'antd';
import useInputState from '../../hooks/useInputState';
import { useDebouncedMemo } from '../../hooks/debouncedMemo';
import prettyBytes from 'pretty-bytes';
import Text from 'antd/lib/typography/Text';
import { isEmpty } from 'lodash';
import LabeledSwitch from '../../components/labeledSwitch/LabeledSwitch';
import { useLocalstorageState } from 'rooks';
import getLocalStorageKey from '../../utils/getLocalStorageKey';
import useChangeStateHandler from '../../hooks/useChangeStateHandler';
import NpmLink from '../../components/NpmLink';

interface Options {
    binary: boolean;
}

const initialOptions: Options = {
    binary: false
};

const titleExtra = (
    <Text type="secondary">
        uses <NpmLink plain packageName="pretty-bytes" />
    </Text>
);

const PrettyBytesPage: FunctionComponent = () => {
    const [input, , setInputByEvent] = useInputState('');
    const [options, setOptions] = useLocalstorageState<Options>(
        getLocalStorageKey('pretty-bytes', 'options'),
        initialOptions
    );
    const handleOptionChecked = useChangeStateHandler(setOptions, 'checked');

    const output = useDebouncedMemo<string>(
        () => {
            if (isEmpty(input)) {
                return '';
            }

            const number = Number.parseInt(input);
            if (isNaN(number)) {
                return 'Invalid format';
            }

            return prettyBytes(number, { binary: options.binary, maximumFractionDigits: 2, locale: 'en-US' });
        },
        [input, options.binary],
        10
    );

    return (
        <PageContainer title="Human Readable Bytes" titleExtra={titleExtra}>
            <PageCol>
                <Input placeholder="Bytes count" value={input} onChange={setInputByEvent} />
                <Text copyable={Boolean(output)} type={output ? undefined : 'secondary'} className={styles.result}>
                    {output || 'Input the value'}
                </Text>
                <LabeledSwitch checked={options.binary} onChange={handleOptionChecked('binary')}>
                    Binary
                </LabeledSwitch>
            </PageCol>
        </PageContainer>
    );
};

export default PrettyBytesPage;
