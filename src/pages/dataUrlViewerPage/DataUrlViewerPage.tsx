import React, { FunctionComponent } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import TextArea from 'antd/lib/input/TextArea';
import useInputState from '../../hooks/useInputState';
import classNames from 'classnames';
import styles from './DataUrlViewerPage.module.scss';
import Flex from '../../components/flex/Flex';
import Text from 'antd/lib/typography/Text';

const DataUrlViewerPage: FunctionComponent = () => {
    const [dataUrl, , setDataUrlByEvent] = useInputState<string>('');

    return (
        <PageContainer title="Data URL Viewer">
            <Flex col gap={6} className="h-100">
                <TextArea rows={8} placeholder="Data URL" value={dataUrl} onChange={setDataUrlByEvent} />
                {dataUrl ? (
                    <iframe src={dataUrl} className={classNames(styles.iframe, 'view-iframe')} />
                ) : (
                    <Text type="secondary">The result will be shown here</Text>
                )}
            </Flex>
        </PageContainer>
    );
};

export default DataUrlViewerPage;
