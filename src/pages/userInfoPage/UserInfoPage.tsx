import React from 'react';
import PageContainer, { PageTag } from '../../components/pageContainer/PageContainer';
import Text from 'antd/lib/typography/Text';
import { Space } from 'antd';

const tags = [PageTag.WIP];

const UserInfoPage = () => {
    return (
        <PageContainer title="User Info" tags={tags}>
            <Space>
                <Text strong>
                    <Text>IP: </Text>
                    <Text copyable>192.168.0.123 (fake)</Text>
                </Text>
            </Space>
        </PageContainer>
    );
};

export default UserInfoPage;
