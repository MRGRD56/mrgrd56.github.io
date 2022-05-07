import React, { useState } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import { Button, Col, Row, Space } from 'antd';
import { v4 } from 'uuid';
import Text from 'antd/lib/typography/Text';
import ExternalLink from '../../components/ExternalLink';
import CopyButton from '../../components/copyButton/CopyButton';
import getNpmPackageLink from '../../utils/getNpmPackageLink';

const titleExtra = (
    <Text type="secondary">
        uses <ExternalLink href={getNpmPackageLink('uuid')}>uuid</ExternalLink>
    </Text>
);

const UuidGeneratorPage = () => {
    const [uuid, setUuid] = useState<string>(v4());

    const generate = () => {
        const newUuid = v4();
        setUuid(newUuid);
        return newUuid;
    };

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
                <Space>
                    <Button onClick={generate}>Generate</Button>
                    <CopyButton value={uuid} onClick={generate}>
                        Generate and copy
                    </CopyButton>
                </Space>
            </Col>
        </PageContainer>
    );
};

export default UuidGeneratorPage;
