import React, { useCallback, useMemo, useState } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import { Button, Col, Row, Space } from 'antd';
import { v4 } from 'uuid';
import Text from 'antd/lib/typography/Text';
import ExternalLink from '../../components/ExternalLink';
import CopyButton from '../../components/copyButton/CopyButton';
import getNpmPackageLink from '../../utils/getNpmPackageLink';
import useStateProducer from '../../hooks/useStateProducer';
import TextArea from 'antd/lib/input/TextArea';
import { useDidMount } from 'rooks';

const titleExtra = (
    <Text type="secondary">
        uses <ExternalLink href={getNpmPackageLink('uuid')}>uuid</ExternalLink>
    </Text>
);

const UuidGeneratorPage = () => {
    const [uuid, setUuid] = useState<string>();
    const [history, setHistory] = useState<string[]>([]);
    const produceHistory = useStateProducer(setHistory);

    const historyString = useMemo<string>(() => {
        return history.join('\n');
    }, [history]);

    const generate = useCallback(() => {
        const newUuid = v4();
        setUuid(newUuid);
        produceHistory((history) => {
            history.unshift(newUuid);
        });
        return newUuid;
    }, []);

    useDidMount(() => {
        generate();
    });

    return (
        <PageContainer title="UUID Generator" titleExtra={titleExtra}>
            <Col>
                <Row>
                    <Space className="mb-2">
                        <Text copyable className="fs-6">
                            {uuid}
                        </Text>
                    </Space>
                </Row>
                <Space className="mb-2">
                    <Button onClick={generate}>Generate</Button>
                    <CopyButton value={uuid} onClick={generate}>
                        Generate and copy
                    </CopyButton>
                </Space>
                <TextArea value={historyString} rows={6} />
            </Col>
        </PageContainer>
    );
};

export default UuidGeneratorPage;
